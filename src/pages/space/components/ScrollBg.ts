import * as THREE from 'three'


export default class ScrollBg {
  private scene: THREE.Scene
  private camera: THREE.OrthographicCamera
  private renderer: THREE.WebGLRenderer
  private textures: THREE.Texture[] = []

  private canvasWidth: number
  private canvasHeight: number
  private mouseDelta = new THREE.Vector2()

  private moveFactor = 0.0008
  private CENTER_BLOCK_SIZE = 50
  private worldSize = 100

  private stickers: THREE.Mesh[] = []
  private STICKER_SIZE = 5

  private zIndexMap: Dict = {
    'BG': 0,
    'goods': 10,
    'people': 20,
  }

  constructor(public container: HTMLElement, bgUrls: string[]) {
    this.canvasWidth = container.clientWidth
    this.canvasHeight = container.clientHeight

    this.loadTextures(bgUrls)
    this.init()
    this.addListeners()
  }

  init() {
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color('#f5f5f5')

    this.camera = new THREE.OrthographicCamera(
      -this.canvasWidth / 100,
      this.canvasWidth / 100,
      this.canvasHeight / 100,
      -this.canvasHeight / 100,
      0.1,
      1000
    )
    this.camera.position.z = 10

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setSize(this.canvasWidth, this.canvasHeight)
    this.container.appendChild(this.renderer.domElement)

    this.createStickers()
    this.animate()
  }

  loadTextures(urls: string[]) {
    const loader = new THREE.TextureLoader()
    this.textures = urls.map((url) => loader.load(url))
  }

  private createStickers() {
    this.textures.forEach((texture) => {
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
      })

      const geometry = new THREE.PlaneGeometry(this.STICKER_SIZE, this.STICKER_SIZE)
      const mesh = new THREE.Mesh(geometry, material)

      // FIXME: 这里坐标修改成外部传递
      mesh.position.x = (Math.random() - 0.5) * this.worldSize
      mesh.position.y = (Math.random() - 0.5) * this.worldSize

      this.scene.add(mesh)
      this.stickers.push(mesh)
    })
  }

  private wrapPosition(pos: number): number {
    const half = this.worldSize / 2
    if (pos < -half) return pos + this.worldSize
    if (pos > half) return pos - this.worldSize
    return pos
  }

  private updateStickersPositionRelativeToCamera() {
    for (const sticker of this.stickers) {
      const dx = this.camera.position.x - sticker.position.x
      const dy = this.camera.position.y - sticker.position.y

      const wrappedX = this.wrapPosition(dx)
      const wrappedY = this.wrapPosition(dy)

      sticker.position.x = this.camera.position.x - wrappedX
      sticker.position.y = this.camera.position.y - wrappedY
    }
  }

  private onMouseMove(event: MouseEvent) {
    // const centerX = this.canvasWidth / 2
    // const centerY = this.canvasHeight / 2
    // this.mouseDelta.set(event.clientX - centerX, event.clientY - centerY)

    const mouseX = event.clientX
    const mouseY = event.clientY

    const centerX = this.canvasWidth / 2
    const centerY = this.canvasHeight / 2

    let deltaX = mouseX - centerX
    let deltaY = mouseY - centerY

    const halfBlock = this.CENTER_BLOCK_SIZE / 2
    if (Math.abs(deltaX) < halfBlock) deltaX = 0
    if (Math.abs(deltaY) < halfBlock) deltaY = 0

    this.mouseDelta?.set(deltaX, deltaY)
  }

  // addBGg = () => {
  //   const uniforms = {
  //     time: { value: 0 },
  //     res: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  //   };

  //   const material = new THREE.ShaderMaterial({
  //     uniforms,
  //     vertexShader: `
  //       varying vec2 vUv;
  //       void main() {
  //         vUv = uv;
  //         gl_Position = vec4(position, 1.0);
  //       }
  //     `,
  //     fragmentShader: `
  //       precision highp float;

  //       uniform float time;
  //       uniform vec2 res;
  //       varying vec2 vUv;

  //       #define GRID_SIZE 100.0
  //       #define GLITCH_FREQ 2.0

  //       float rand(float n) {
  //           return fract(sin(n) * 43758.5453);
  //       }

  //       float glitchWave(float id, float t) {
  //           float phase = floor(t / GLITCH_FREQ);
  //           float r = rand(id + phase);
  //           return sin(t * 5.0 + r * 6.28);
  //       }

  //       void main() {
  //           vec2 uv = vUv * res;

  //           float gridX = mod(uv.x, GRID_SIZE);
  //           float gridY = mod(uv.y, GRID_SIZE);

  //           float xId = floor(uv.x / GRID_SIZE);
  //           float yId = floor(uv.y / GRID_SIZE);

  //           float gx = glitchWave(xId, time) * 5.0;
  //           float gy = glitchWave(yId, time) * 5.0;

  //           gridX += gx;
  //           gridY += gy;

  //           float line = step(gridX, 1.0) + step(gridY, 1.0);
  //           vec3 gridColor = vec3(0.0, 1.0, 0.2) * line;

  //           gl_FragColor = vec4(gridColor, 1.0);
  //       }
  //     `,
  //     transparent: false,
  //   });

  //   // 使用一个 Plane（满屏）
  //   const plane = new THREE.Mesh(
  //     new THREE.PlaneGeometry(2, 2),
  //     material
  //   );
  //   this.scene.add(plane);
  // }

  animate = () => {
    requestAnimationFrame(this.animate)

    this.camera.position.x += this.mouseDelta.x * this.moveFactor
    this.camera.position.y -= this.mouseDelta.y * this.moveFactor

    this.updateStickersPositionRelativeToCamera()

    // this.addBGg()

    this.renderer.render(this.scene, this.camera)
  }

  private onResize = () => {
    this.canvasWidth = this.container.clientWidth
    this.canvasHeight = this.container.clientHeight
    this.renderer.setSize(this.canvasWidth, this.canvasHeight)

    this.camera.left = -this.canvasWidth / 100
    this.camera.right = this.canvasWidth / 100
    this.camera.top = this.canvasHeight / 100
    this.camera.bottom = -this.canvasHeight / 100
    this.camera.updateProjectionMatrix()
  }

  private addListeners() {
    this.container.addEventListener('mousemove', this.onMouseMove.bind(this))
    window.addEventListener('resize', this.onResize)
  }

  public removeListeners() {
    this.container.removeEventListener('mousemove', this.onMouseMove.bind(this))
    window.removeEventListener('resize', this.onResize)
  }
}

