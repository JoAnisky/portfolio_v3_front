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

interface City { lat: number; lon: number; label: string; tz: string }

const CITIES: City[] = [
  { lat:  48.85, lon:   2.35, label: 'Paris',         tz: 'Europe/Paris'            },
  { lat:  51.51, lon:  -0.13, label: 'London',        tz: 'Europe/London'           },
  { lat:  40.71, lon: -74.01, label: 'New York',      tz: 'America/New_York'        },
  { lat:  37.77, lon:-122.42, label: 'San Francisco', tz: 'America/Los_Angeles'     },
  { lat:  35.68, lon: 139.69, label: 'Tokyo',         tz: 'Asia/Tokyo'              },
  { lat: -33.87, lon: 151.21, label: 'Sydney',        tz: 'Australia/Sydney'        },
]

// Formateur d'heure par timezone — mis en cache pour éviter de recréer à chaque tick
const timeFormatters = new Map<string, Intl.DateTimeFormat>(
    CITIES.map(({ tz }) => [
      tz,
      new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: tz }),
    ])
)

// Référence vers les divs des labels pour la mise à jour de l'heure
const labelDivs: Array<{ div: HTMLDivElement; cityName: string; tz: string }> = []

function updateClocks() {
  for (const { div, cityName, tz } of labelDivs) {
    const time = timeFormatters.get(tz)!.format(new Date())
    div.querySelector('.label-time')!.textContent = ' - ' + time
  }
}

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

// ─── Géométries ─────────────────────────────────────────────────────────────

function createLandDots(positions: Float32Array): THREE.Points {
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  return new THREE.Points(geo, new THREE.PointsMaterial({
    color: CYAN,
    size: 0.022,
    transparent: true,
    opacity: 0.75,
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

  for (const { lat, lon, label, tz } of CITIES) {
    const pos = latLonToVec3(lat, lon, radius)

    const marker = new THREE.Mesh(markerGeo, markerMat)
    marker.position.copy(pos)
    group.add(marker)

    const halo = new THREE.Mesh(haloGeo, haloMat)
    halo.position.copy(pos)
    group.add(halo)

    const div = document.createElement('div')
    Object.assign(div.style, {
      position: 'relative',
      color: '#0d0d0d',
      fontFamily: 'inherit',
      borderRadius: '3px',
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
      userSelect: 'none',
      overflow: 'hidden',
      lineHeight: '1',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '3px 6px',
    })

    // Fond semi-transparent isolé — n'affecte pas l'opacité du texte
    const bg = document.createElement('div')
    Object.assign(bg.style, {
      position: 'absolute',
      inset: '0',
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(4px)',
      borderRadius: '3px',
      zIndex: '0',
    })
    div.appendChild(bg)

    const nameEl = document.createElement('span')
    nameEl.textContent = label
    Object.assign(nameEl.style, {
      position: 'relative',
      zIndex: '1',
      fontSize: '9px',
      fontWeight: '700',
      letterSpacing: '0.07em',
      textTransform: 'uppercase',
    })

    const timeEl = document.createElement('span')
    timeEl.className = 'label-time'
    timeEl.textContent = ' - ' + timeFormatters.get(tz)!.format(new Date())
    Object.assign(timeEl.style, {
      position: 'relative',
      zIndex: '1',
      fontSize: '10px',
      fontWeight: '500',
      fontVariantNumeric: 'tabular-nums',
      letterSpacing: '0.04em',
      color: '#444',
    })

    div.appendChild(nameEl)
    div.appendChild(timeEl)

    labelDivs.push({ div, cityName: label, tz })

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

function init() {
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
  camera.position.z = 3.4

  // Globe
  globe = new THREE.Group()
  scene.add(globe)
  const R = 1

  // Wireframe, markers et arcs ajoutés immédiatement — globe visible de suite
  globe.add(createWireframeSphere(R))
  globe.add(createCityMarkers(R))
  globe.add(createArcs(R))
  scene.add(createAtmosphere(R))
  scene.add(new THREE.AmbientLight(CYAN, 0.15))

  // Land dots calculés dans un Worker — thread principal non bloqué
  ;(async () => {
    const worker = new Worker(
        new URL('~/workers/landDots.worker.ts', import.meta.url),
        { type: 'module' },
    )

    // Fetch du TopoJSON ici (le Worker n'a pas accès aux alias Vite pour fetch)
    const topo = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json').then(r => r.json())

    worker.postMessage({ topo, radius: R, lonStep: 2.2, latStep: 2.2 })

    worker.onmessage = (e: MessageEvent<{ positions: ArrayBuffer }>) => {
      const positions = new Float32Array(e.data.positions)
      globe.add(createLandDots(positions))
      worker.terminate()
    }
  })()
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

  // Mise à jour des horloges toutes les secondes
  const clockInterval = setInterval(updateClocks, 1000)
  ;(globe as any).__clockInterval = clockInterval

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
  clearInterval((globe as any)?.__clockInterval)
  controls?.dispose()
  renderer?.dispose()
  labelRenderer?.domElement.remove()
  labelDivs.length = 0
})
</script>

<template>
  <div ref="wrapperRef" class="relative w-full h-full">
    <canvas ref="canvasRef" class="block w-full h-full" />
  </div>
</template>