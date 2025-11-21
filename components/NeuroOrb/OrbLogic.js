// OrbLogic.js

// Configuration Presets
const PRESETS = {
    idle: { color: { r: 0, g: 243, b: 255 }, rotationSpeedY: 0.002, rotationSpeedX: 0.001, squishY: 1.0, glow: 4, pulseSpeed: 0.03, pulseAmp: 5 },
    thinking: { color: { r: 176, g: 38, b: 255 }, rotationSpeedY: 0.007, rotationSpeedX: 0.005, squishY: 0.95, glow: 8, pulseSpeed: 0.1, pulseAmp: 2 },
    error: { color: { r: 255, g: 0, b: 64 }, rotationSpeedY: 0.0, rotationSpeedX: 0.0, squishY: 0.4, glow: 2, pulseSpeed: 0.0, pulseAmp: 0 }
}

// Helpers
const lerp = (start, end, factor) => start + (end - start) * factor
const rgbToString = (r, g, b) => `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export class OrbLogic {
    constructor({ baseRadius, nodeCount }) {
        this.baseRadius = baseRadius
        this.nodeCount = nodeCount

        // Physics State
        this.angleX = 0
        this.angleY = 0
        this.time = 0

        // 3D Data
        this.baseNodes = []

        // Current Render Values (interpolated)
        this.current = {
            rgb: { ...PRESETS.idle.color },
            squish: 1,
            colorString: '#00f3ff'
        }

        // Override System
        this.overrides = {
            active: false,
            color: null,
            squishY: null,
            pulseAmp: null,
            rotationSpeedY: null,
            radiusModifier: 0
        }

        this.initNodes()
    }

    initNodes() {
        this.baseNodes = []
        for (let i = 0; i < this.nodeCount; i++) {
            const theta = Math.random() * 2 * Math.PI
            const phi = Math.acos((Math.random() * 2) - 1)
            this.baseNodes.push({
                x: Math.sin(phi) * Math.cos(theta),
                y: Math.sin(phi) * Math.sin(theta),
                z: Math.cos(phi),
                sizeOffset: Math.random()
            })
        }
    }

    updateParams({ nodeCount, baseRadius }) {
        if (baseRadius) this.baseRadius = baseRadius
        if (nodeCount && nodeCount !== this.nodeCount) {
            this.nodeCount = nodeCount
            this.initNodes()
        }
    }

    /**
     * Main calculation frame
     * @param {string} mode - 'idle', 'thinking', 'error'
     * @returns {Object} { nodes, connections, style }
     */
    tick(mode) {
        this.time += 1

        // 1. Determine Target State
        const basePreset = PRESETS[mode] || PRESETS.idle
        const target = {
            color: (this.overrides.active && this.overrides.color) ? this.overrides.color : basePreset.color,
            rotationSpeedX: basePreset.rotationSpeedX,
            rotationSpeedY: (this.overrides.active && this.overrides.rotationSpeedY !== null) ? this.overrides.rotationSpeedY : basePreset.rotationSpeedY,
            squishY: (this.overrides.active && this.overrides.squishY !== null) ? this.overrides.squishY : basePreset.squishY,
            glow: basePreset.glow,
            pulseSpeed: basePreset.pulseSpeed,
            pulseAmp: (this.overrides.active && this.overrides.pulseAmp !== null) ? this.overrides.pulseAmp : basePreset.pulseAmp,
        }

        // 2. Interpolation
        this.current.rgb.r = lerp(this.current.rgb.r, target.color.r, 0.1)
        this.current.rgb.g = lerp(this.current.rgb.g, target.color.g, 0.1)
        this.current.rgb.b = lerp(this.current.rgb.b, target.color.b, 0.1)
        this.current.colorString = rgbToString(this.current.rgb.r, this.current.rgb.g, this.current.rgb.b)

        this.current.squish = lerp(this.current.squish, target.squishY, 0.1)
        this.overrides.radiusModifier = lerp(this.overrides.radiusModifier, 0, 0.15)

        // 3. Physics Updates
        this.angleX += target.rotationSpeedX
        this.angleY += target.rotationSpeedY

        const breath = Math.sin(this.time * target.pulseSpeed) * target.pulseAmp
        const currentRadius = this.baseRadius + breath + this.overrides.radiusModifier

        // 4. Projection & Connections
        const projectedNodes = this._projectNodes(currentRadius)
        const connections = this._calculateConnections(projectedNodes, currentRadius)

        return {
            nodes: projectedNodes,
            connections: connections,
            style: {
                color: this.current.colorString,
                glow: this.current.rgb // usually passed to filter
            },
            glowStrength: target.glow // Return current target glow
        }
    }

    _projectNodes(radius) {
        const sinX = Math.sin(this.angleX); const cosX = Math.cos(this.angleX)
        const sinY = Math.sin(this.angleY); const cosY = Math.cos(this.angleY)

        return this.baseNodes.map(n => {
            let x = n.x * cosY - n.z * sinY
            let z = n.z * cosY + n.x * sinY
            let y = n.y * cosX - z * sinX
            z = z * cosX + n.y * sinX

            const finalX = x * radius
            const finalY = y * radius * this.current.squish
            const finalZ = z * radius
            const fov = 800
            const scale = fov / (fov - finalZ)

            return {
                x: finalX * scale,
                y: finalY * scale,
                z: finalZ,
                size: (1.5 + n.sizeOffset) * scale,
                opacity: Math.max(0.1, (finalZ + radius) / (radius * 2))
            }
        })
    }

    _calculateConnections(nodes, radius) {
        const tempConns = []
        const connectDistance = 80 * (radius / 200)
        const distSq = connectDistance * connectDistance

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const a = nodes[i]; const b = nodes[j]
                const d2 = (a.x - b.x) ** 2 + (a.y - b.y) ** 2
                if (d2 < distSq) {
                    const distFactor = 1 - (d2 / distSq)
                    tempConns.push({
                        x1: a.x, y1: a.y, x2: b.x, y2: b.y,
                        width: distFactor * 1.5,
                        opacity: distFactor * ((a.opacity + b.opacity) / 2) * 0.6
                    })
                }
            }
        }
        return tempConns
    }

    // --- Sequence API ---
    async executeSequence(sequence) {
        this.overrides.active = true
        for (const action of sequence) {
            if (action.type === 'color') this.overrides.color = action.value
            else if (action.type === 'squish') this.overrides.squishY = action.value
            else if (action.type === 'talk') this.overrides.radiusModifier = action.strength || 30
            else if (action.type === 'spin') this.overrides.rotationSpeedY = action.speed

            if (action.duration) await wait(action.duration)
        }
        // Reset
        this.overrides.active = false
        this.overrides.color = null
        this.overrides.squishY = null
        this.overrides.rotationSpeedY = null
        this.overrides.pulseAmp = null
    }
}