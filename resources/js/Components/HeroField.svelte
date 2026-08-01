<script>
	/**
	 * Gemini-like luminous flow field for marketing heroes.
	 * Raw WebGL POINTS + CPU curl advection — no Three.js / no packages.
	 */

	const COUNT = 18500
	const STRIDE = 4 // x, y, age, hue

	const VS = `#version 300 es
precision mediump float;
layout(location=0) in vec4 a;
uniform vec2 uRes;
uniform float uPoint;
out float vA;
out float vH;
void main(){
	vA=a.z; vH=a.w;
	vec2 p=a.xy/uRes*2.0-1.0;
	p.y=-p.y;
	gl_Position=vec4(p,0.0,1.0);
	gl_PointSize=uPoint*(0.55+0.45*a.z);
}`

	const FS = `#version 300 es
precision mediump float;
in float vA;
in float vH;
out vec4 o;
void main(){
	vec2 c=gl_PointCoord*2.0-1.0;
	float d=dot(c,c);
	if(d>1.0) discard;
	float soft=exp(-d*2.8)*(1.0-d);
	// warm white → ember/coral by hue channel
	vec3 warm=vec3(1.0,0.96,0.90);
	vec3 ember=vec3(1.0,0.35,0.21);
	vec3 col=mix(warm,ember,smoothstep(0.15,0.85,vH));
	float a=soft*vA*0.72;
	o=vec4(col*a,a);
}`

	function hash(n) {
		n = (n << 13) ^ n
		return ((n * (n * n * 15731 + 789221) + 1376312589) & 0x7fffffff) / 0x7fffffff
	}

	function noise2(x, y) {
		const ix = Math.floor(x)
		const iy = Math.floor(y)
		const fx = x - ix
		const fy = y - iy
		const ux = fx * fx * (3 - 2 * fx)
		const uy = fy * fy * (3 - 2 * fy)
		const a = hash(ix + iy * 57)
		const b = hash(ix + 1 + iy * 57)
		const c = hash(ix + (iy + 1) * 57)
		const d = hash(ix + 1 + (iy + 1) * 57)
		return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy
	}

	/** Compact curl-ish flow from value noise */
	function flow(x, y, t) {
		const s = 0.00095
		const e = 22
		const n1 = noise2(x * s + t * 0.06, y * s * 0.85)
		const n2 = noise2(x * s * 0.7 + 40, y * s + t * 0.05)
		const dx =
			(noise2((x + e) * s + t * 0.06, y * s * 0.85) - noise2((x - e) * s + t * 0.06, y * s * 0.85)) /
			(2 * e)
		const dy =
			(noise2(x * s * 0.7, (y + e) * s + t * 0.05) - noise2(x * s * 0.7, (y - e) * s + t * 0.05)) /
			(2 * e)
		// rotate gradient → curl-like tangential field + layered drift
		return {
			x: -dy * 3200 + (n2 - 0.5) * 0.22,
			y: dx * 3200 + (n1 - 0.5) * 0.18,
		}
	}

	function compile(gl, type, src) {
		const sh = gl.createShader(type)
		gl.shaderSource(sh, src)
		gl.compileShader(sh)
		if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
			gl.deleteShader(sh)
			return null
		}
		return sh
	}

	/** @type {import('svelte/attachments').Attachment<HTMLCanvasElement>} */
	function field(canvas) {
		const gl = canvas.getContext('webgl2', {
			alpha: true,
			antialias: false,
			premultipliedAlpha: true,
			powerPreference: 'low-power',
		})
		if (!gl) return

		const vs = compile(gl, gl.VERTEX_SHADER, VS)
		const fs = compile(gl, gl.FRAGMENT_SHADER, FS)
		if (!vs || !fs) return

		const prog = gl.createProgram()
		gl.attachShader(prog, vs)
		gl.attachShader(prog, fs)
		gl.linkProgram(prog)
		gl.deleteShader(vs)
		gl.deleteShader(fs)
		if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
			gl.deleteProgram(prog)
			return
		}

		const uRes = gl.getUniformLocation(prog, 'uRes')
		const uPoint = gl.getUniformLocation(prog, 'uPoint')

		const data = new Float32Array(COUNT * STRIDE)
		const buf = gl.createBuffer()

		let w = 1
		let h = 1
		let dpr = 1
		let raf = 0
		let t0 = performance.now()
		let running = false
		const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
		const finePointer = window.matchMedia('(pointer: fine)').matches

		function placeOnSheet(u, time, layer) {
			const ridge = noise2(u * 5.5 + time * 0.1 + layer * 2.7, 1.8 + layer * 0.45)
			return {
				x: u * w,
				y: (0.08 + layer * 0.2 + ridge * 0.4 + (Math.random() - 0.5) * 0.15) * h,
			}
		}

		/** Seed already mid-flow so first paint matches the “stunning” dispersed look */
		function seed() {
			const ww = Math.max(w, 1)
			const hh = Math.max(h, 1)
			for (let i = 0; i < COUNT; i++) {
				const o = i * STRIDE
				const layer = i % 4
				const u = Math.random()
				let { x, y } = placeOnSheet(u, 0, layer)

				// Pre-drift each particle so we skip the tight-ribbon birth phase
				const steps = 55 + ((i * 19) % 95)
				for (let s = 0; s < steps; s++) {
					const f = flow(x, y, s * 0.022)
					x += f.x * 0.95
					y += f.y * 0.95
					if (x < -20 || x > ww + 20 || y < -20 || y > hh + 20) {
						const p = placeOnSheet(Math.random(), s * 0.02, layer)
						x = p.x
						y = p.y
					}
				}

				data[o] = x
				data[o + 1] = y
				data[o + 2] = 0.4 + Math.random() * 0.6
				data[o + 3] = 0.18 + Math.random() * 0.72
			}
		}

		function resize() {
			const rect = canvas.getBoundingClientRect()
			dpr = Math.min(window.devicePixelRatio || 1, 2)
			const nextW = Math.max(1, Math.floor(rect.width * dpr))
			const nextH = Math.max(1, Math.floor(rect.height * dpr))
			const changed = nextW !== w || nextH !== h
			w = nextW
			h = nextH
			if (canvas.width !== w || canvas.height !== h) {
				canvas.width = w
				canvas.height = h
				gl.viewport(0, 0, w, h)
			}
			return changed
		}

		function advect(dt, time) {
			const mx = mouse.x * w
			const my = mouse.y * h
			const influence = finePointer && !reduced ? 1 : 0
			const speed = 55 * dt

			for (let i = 0; i < COUNT; i++) {
				const o = i * STRIDE
				let x = data[o]
				let y = data[o + 1]
				let age = data[o + 2]
				let hue = data[o + 3]

				const f = flow(x, y, time)
				x += f.x * speed
				y += f.y * speed

				if (influence) {
					const dx = mx - x
					const dy = my - y
					const d2 = dx * dx + dy * dy + 1
					const pull = 18000 / d2
					x += dx * pull * dt * 0.015
					y += dy * pull * dt * 0.015
				}

				age -= dt * 0.09
				if (age <= 0.02 || x < -40 || x > w + 40 || y < -40 || y > h + 40) {
					const layer = i % 4
					const p = placeOnSheet(Math.random(), time, layer)
					x = p.x
					y = p.y
					age = 0.55 + Math.random() * 0.45
					hue = 0.18 + Math.random() * 0.72
				}

				data[o] = x
				data[o + 1] = y
				data[o + 2] = age
				data[o + 3] = hue
			}
		}

		function draw() {
			gl.useProgram(prog)
			gl.enable(gl.BLEND)
			gl.blendFunc(gl.ONE, gl.ONE)
			gl.clearColor(0.02, 0.02, 0.03, 1)
			gl.clear(gl.COLOR_BUFFER_BIT)

			gl.bindBuffer(gl.ARRAY_BUFFER, buf)
			gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW)
			gl.enableVertexAttribArray(0)
			gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0)

			gl.uniform2f(uRes, w, h)
			gl.uniform1f(uPoint, Math.max(1.85, 2.75 * dpr))
			gl.drawArrays(gl.POINTS, 0, COUNT)
		}

		function frame(now) {
			if (!running) return
			const dt = Math.min(0.033, (now - t0) / 1000)
			t0 = now
			mouse.x += (mouse.tx - mouse.x) * 0.06
			mouse.y += (mouse.ty - mouse.y) * 0.06
			advect(dt, now * 0.001)
			draw()
			raf = requestAnimationFrame(frame)
		}

		function start() {
			if (running || reduced) return
			if (document.visibilityState === 'hidden') return
			running = true
			t0 = performance.now()
			raf = requestAnimationFrame(frame)
		}

		function stop() {
			running = false
			if (raf) {
				cancelAnimationFrame(raf)
				raf = 0
			}
		}

		function onPointer(e) {
			if (!finePointer) return
			const rect = canvas.getBoundingClientRect()
			mouse.tx = (e.clientX - rect.left) / Math.max(1, rect.width)
			mouse.ty = (e.clientY - rect.top) / Math.max(1, rect.height)
		}

		function onVis() {
			if (document.visibilityState === 'hidden') stop()
			else start()
		}

		function boot() {
			resize()
			seed()
			// Short polish pass — seed is already mid-flow
			for (let i = 0; i < 36; i++) advect(0.016, 1.5 + i * 0.02)
			draw()
		}

		boot()

		const ro = new ResizeObserver(() => {
			const changed = resize()
			if (changed) {
				seed()
				for (let i = 0; i < 24; i++) advect(0.016, 1.5 + i * 0.02)
			}
			draw()
		})
		ro.observe(canvas.parentElement || canvas)

		window.addEventListener('pointermove', onPointer, { passive: true })
		document.addEventListener('visibilitychange', onVis)

		if (!reduced) start()

		return () => {
			stop()
			ro.disconnect()
			window.removeEventListener('pointermove', onPointer)
			document.removeEventListener('visibilitychange', onVis)
			gl.deleteBuffer(buf)
			gl.deleteProgram(prog)
		}
	}
</script>

<canvas class="hero-field" aria-hidden="true" {@attach field}></canvas>

<style>
	.hero-field {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		max-width: 100%;
		display: block;
		pointer-events: none;
		z-index: 0;
	}
</style>
