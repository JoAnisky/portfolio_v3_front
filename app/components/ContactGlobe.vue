<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'

const canvasRef  = ref<HTMLCanvasElement | null>(null)
const wrapperRef = ref<HTMLDivElement | null>(null)

let renderer: THREE.WebGLRenderer
let labelRenderer: CSS2DRenderer
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let controls: OrbitControls
let animationId: number
let globe: THREE.Group

const CYAN  = 0x0dcdef
const GREEN = 0x1ad792
const WHITE = 0xffffff

interface City { lat: number; lon: number; label: string }

const CITIES: City[] = [
  { lat:  48.85, lon:   2.35, label: 'Paris'         },
  { lat:  51.51, lon:  -0.13, label: 'London'        },
  { lat:  40.71, lon: -74.01, label: 'New York'      },
  { lat:  37.77, lon:-122.42, label: 'San Francisco' },
  { lat:  35.68, lon: 139.69, label: 'Tokyo'         },
  { lat: -33.87, lon: 151.21, label: 'Sydney'        },
]

// ─── Geo helpers ────────────────────────────────────────────────────────────

function latLonToVec3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi   = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta),
  )
}

/**
 * Algorithme ray-casting : point [px, py] dans polygone de rings.
 * Chaque ring est un tableau de [lon, lat].
 */
function pointInPolygon(px: number, py: number, rings: number[][][]): boolean {
  let inside = false
  for (const ring of rings) {
    const n = ring.length
    let j = n - 1
    for (let i = 0; i < n; i++) {
      const [xi, yi] = ring[i]!
      const [xj, yj] = ring[j]!
      if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) {
        inside = !inside
      }
      j = i
    }
  }
  return inside
}

/**
 * Teste si [lon, lat] est sur terre en vérifiant tous les polygones du GeoJSON.
 * features : GeoJSON FeatureCollection features (Polygon | MultiPolygon)
 */
function isOnLand(lon: number, lat: number, features: any[]): boolean {
  for (const feature of features) {
    const { type, coordinates } = feature.geometry
    if (type === 'Polygon') {
      if (pointInPolygon(lon, lat, coordinates)) return true
    } else if (type === 'MultiPolygon') {
      for (const poly of coordinates) {
        if (pointInPolygon(lon, lat, poly)) return true
      }
    }
  }
  return false
}

// ─── Géométries ─────────────────────────────────────────────────────────────

/**
 * Génère des dots sur la surface de la sphère uniquement sur les terres.
 * Stratégie : grille régulière lon/lat → filtrage isOnLand → Vec3.
 */
function createLandDots(radius: number, features: any[]): THREE.Points {
  const positions: number[] = []

  // Grille ~2.2° de résolution — bon compromis densité / perf
  const lonStep = 2.2
  const latStep = 2.2

  for (let lat = -90; lat <= 90; lat += latStep) {
    for (let lon = -180; lon <= 180; lon += lonStep) {
      // Légère variation pour casser le côté grille parfaite
      const jLon = lon + (Math.random() - 0.5) * lonStep * 0.6
      const jLat = lat + (Math.random() - 0.5) * latStep * 0.6

      if (!isOnLand(jLon, jLat, features)) continue

      const v = latLonToVec3(jLat, jLon, radius)
      positions.push(v.x, v.y, v.z)
    }
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  return new THREE.Points(geo, new THREE.PointsMaterial({
    color: CYAN,
    size: 0.022,
    transparent: true,
    opacity: 0.55,
    sizeAttenuation: true,
  }))
}

function createWireframeSphere(radius: number): THREE.LineSegments {
  return new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.SphereGeometry(radius, 24, 16)),
      new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0.05 }),
  )
}

function createCityMarkers(radius: number): THREE.Group {
  const group     = new THREE.Group()
  const markerGeo = new THREE.SphereGeometry(0.018, 8, 8)
  const markerMat = new THREE.MeshBasicMaterial({ color: WHITE })
  const haloGeo   = new THREE.SphereGeometry(0.032, 8, 8)
  const haloMat   = new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.18 })

  for (const { lat, lon, label } of CITIES) {
    const pos = latLonToVec3(lat, lon, radius)

    const marker = new THREE.Mesh(markerGeo, markerMat)
    marker.position.copy(pos)
    group.add(marker)

    const halo = new THREE.Mesh(haloGeo, haloMat)
    halo.position.copy(pos)
    group.add(halo)

    const div = document.createElement('div')
    div.textContent = label
    Object.assign(div.style, {
      background: 'white',
      color: '#0d0d0d',
      fontSize: '9px',
      fontFamily: 'inherit',
      fontWeight: '600',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      padding: '2px 6px',
      borderRadius: '3px',
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
      userSelect: 'none',
      lineHeight: '1.4',
    })
    const labelObj = new CSS2DObject(div)
    labelObj.position.copy(pos.clone().normalize().multiplyScalar(radius + 0.14))
    group.add(labelObj)
  }
  return group
}

function createArc(from: THREE.Vector3, to: THREE.Vector3, radius: number): THREE.Line {
  const points: THREE.Vector3[] = []
  const altitude = radius * 0.38
  for (let i = 0; i <= 64; i++) {
    const t = i / 64
    const p = new THREE.Vector3().lerpVectors(from, to, t)
    p.normalize().multiplyScalar(radius + Math.sin(Math.PI * t) * altitude)
    points.push(p)
  }
  return new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(points),
      new THREE.LineBasicMaterial({ color: GREEN, transparent: true, opacity: 0.7 }),
  )
}

function createArcs(radius: number): THREE.Group {
  const group = new THREE.Group()
  for (let i = 0; i < CITIES.length - 1; i++) {
    const a = CITIES[i]!
    const b = CITIES[i + 1]!
    group.add(createArc(
        latLonToVec3(a.lat, a.lon, radius),
        latLonToVec3(b.lat, b.lon, radius),
        radius,
    ))
  }
  return group
}

function createAtmosphere(radius: number): THREE.Mesh {
  return new THREE.Mesh(
      new THREE.SphereGeometry(radius * 1.025, 32, 32),
      new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.04, side: THREE.BackSide }),
  )
}

// ─── Init ────────────────────────────────────────────────────────────────────

async function init() {
  const canvas  = canvasRef.value!
  const wrapper = wrapperRef.value!
  const W = canvas.clientWidth
  const H = canvas.clientHeight

  // WebGL renderer
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(W, H, false)
  renderer.setClearColor(0x000000, 0)

  // CSS2D renderer
  labelRenderer = new CSS2DRenderer()
  labelRenderer.setSize(W, H)
  labelRenderer.domElement.style.cssText =
      'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;'
  wrapper.appendChild(labelRenderer.domElement)

  // Scene & Camera
  scene  = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100)
  camera.position.z = 3.2

  // Globe
  globe = new THREE.Group()
  scene.add(globe)
  const R = 1

  // Fetch GeoJSON naturalearth land (110m — léger ~100kb)
  const geoRes   = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json')
  const topo     = await geoRes.json()

  // Conversion TopoJSON → GeoJSON via topojson-client (UMD via CDN)
  // On charge topojson dynamiquement pour ne pas ajouter de dep npm
  await new Promise<void>((resolve) => {
    if ((window as any).topojson) { resolve(); return }
    const s = document.createElement('script')
    s.src = 'https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js'
    s.onload = () => resolve()
    document.head.appendChild(s)
  })

  const tj = (window as any).topojson
  const landGeo = tj.feature(topo, topo.objects.land)
  const features = landGeo.type === 'FeatureCollection'
      ? landGeo.features
      : [landGeo]

  globe.add(createLandDots(R, features))
  globe.add(createWireframeSphere(R))
  globe.add(createCityMarkers(R))
  globe.add(createArcs(R))
  scene.add(createAtmosphere(R))
  scene.add(new THREE.AmbientLight(CYAN, 0.15))

  // OrbitControls
  controls = new OrbitControls(camera, canvas)
  controls.enableDamping   = true
  controls.dampingFactor   = 0.06
  controls.enableZoom      = false
  controls.enablePan       = false
  controls.rotateSpeed     = 0.6
  controls.minPolarAngle   = Math.PI * 0.1
  controls.maxPolarAngle   = Math.PI * 0.9
  controls.autoRotate      = true
  controls.autoRotateSpeed = 0.6

  // Resize
  const ro = new ResizeObserver(() => {
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    renderer.setSize(w, h, false)
    labelRenderer.setSize(w, h)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  })
  ro.observe(canvas)

  // Loop
  function animate() {
    animationId = requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
    labelRenderer.render(scene, camera)
  }
  animate()
}

onMounted(() => init())

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  controls?.dispose()
  renderer?.dispose()
  labelRenderer?.domElement.remove()
})
</script>

<template>
  <div ref="wrapperRef" class="relative w-full h-full">
    <canvas ref="canvasRef" class="block w-full h-full" />
  </div>
</template>