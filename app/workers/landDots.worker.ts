// Tourne dans un thread séparé — pas d'accès au DOM ni à Three.js.
// Reçoit le TopoJSON, calcule les positions XYZ, renvoie un Float32Array.

interface WorkerInput {
    topo: any
    radius: number
    lonStep: number
    latStep: number
}

// ─── Ray-casting point-dans-polygone ────────────────────────────────────────

function pointInPolygon(px: number, py: number, rings: number[][][]): boolean {
    let inside = false
    for (const ring of rings) {
        const n = ring.length
        let j = n - 1
        for (let i = 0; i < n; i++) {
            const xi = ring[i]![0]!
            const yi = ring[i]![1]!
            const xj = ring[j]![0]!
            const yj = ring[j]![1]!
            if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) {
                inside = !inside
            }
            j = i
        }
    }
    return inside
}

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

// ─── Conversion lat/lon → XYZ ───────────────────────────────────────────────

function latLonToXYZ(lat: number, lon: number, radius: number): [number, number, number] {
    const phi   = (90 - lat) * (Math.PI / 180)
    const theta = (lon + 180) * (Math.PI / 180)
    return [
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta),
    ]
}

// ─── TopoJSON → GeoJSON (embarqué, pas de dep externe) ──────────────────────
// Implémentation minimale de topojson.feature pour éviter le chargement UMD.

function topoFeature(topology: any, object: any): any {
    return {
        type: 'FeatureCollection',
        features: object.geometries.map((geom: any) => ({
            type: 'Feature',
            geometry: decode(topology, geom),
            properties: geom.properties ?? {},
        })),
    }
}

function decode(topology: any, geom: any): any {
    const arcs = topology.arcs as number[][][]
    const scale = topology.transform?.scale ?? [1, 1]
    const translate = topology.transform?.translate ?? [0, 0]

    // Dé-quantification des arcs
    function getArc(index: number): number[][] {
        const reversed = index < 0
        const arc = arcs[reversed ? ~index : index]!
        let x = 0, y = 0
        const pts = arc.map((pt) => {
            x += pt[0]!
            y += pt[1]!
            return [x * scale[0]! + translate[0]!, y * scale[1]! + translate[1]!]
        })
        return reversed ? pts.reverse() : pts
    }

    function decodeRing(arcIndices: number[]): number[][] {
        const pts: number[][] = []
        for (const idx of arcIndices) {
            const arc = getArc(idx)
            // Éviter le doublon de point de jonction entre arcs
            pts.push(...arc.slice(0, -1))
        }
        // Fermer le ring
        if (pts.length > 0) pts.push(pts[0]!)
        return pts
    }

    if (geom.type === 'Polygon') {
        return { type: 'Polygon', coordinates: geom.arcs.map(decodeRing) }
    }
    if (geom.type === 'MultiPolygon') {
        return { type: 'MultiPolygon', coordinates: geom.arcs.map((poly: number[][]) => poly.map(decodeRing)) }
    }
    // GeometryCollection ou autre — on renvoie null, isOnLand le skipera
    return { type: geom.type, coordinates: [] }
}

// ─── Handler principal ───────────────────────────────────────────────────────

self.onmessage = (e: MessageEvent<WorkerInput>) => {
    const { topo, radius, lonStep, latStep } = e.data

    const landGeo  = topoFeature(topo, topo.objects.land)
    const features = landGeo.features

    const positions: number[] = []

    for (let lat = -90; lat <= 90; lat += latStep) {
        for (let lon = -180; lon <= 180; lon += lonStep) {
            const jLon = lon + (Math.random() - 0.5) * lonStep * 0.6
            const jLat = lat + (Math.random() - 0.5) * latStep * 0.6
            if (!isOnLand(jLon, jLat, features)) continue
            positions.push(...latLonToXYZ(jLat, jLon, radius))
        }
    }

    // Transfert par référence (zero-copy) via Transferable
    const buffer = new Float32Array(positions).buffer
    self.postMessage({ positions: buffer }, [buffer])
}