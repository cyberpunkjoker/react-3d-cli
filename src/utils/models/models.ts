import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { ExposureShader } from 'three/examples/jsm/shaders/ExposureShader.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { LoadModel } from './LoadModel';
import { OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect';


interface CoordinateProps {
  x?: number;
  y?: number;
  z?: number;
}

export interface ModelInfoProps {
  modelUrl: string;
  textureUrl?: string;
  cameraPosition?: CoordinateProps,
  exposure?: number | null;
  zoom?: number;
  ambientLightIntensity?: number;
  modelRotation?: CoordinateProps;
  modelPosition?: CoordinateProps;
}

export class ModelViewer {
  private scene: THREE.Scene;
  private camera: THREE.Camera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private mixer: THREE.AnimationMixer;
  private composer: EffectComposer;
  private renderCallback!: () => void;

  _previousTime: number = 0;
  modelLoader: LoadModel;

  constructor(private container: HTMLElement, private modelInfo: ModelInfoProps) {
    this.init()
    this.renderCallback = this.render.bind(this);
  }

  init() {
    const { modelUrl, textureUrl } = this.modelInfo;

    this.modelLoader = new LoadModel(modelUrl, textureUrl, this.modelInfo)
    this.scene = this.initScene()
    this.camera = this.initCamera()
    this.renderer = this.initRenderer()
    this.controls = this.initControls()
    this.composer = this.initComposer()

    this.initLight()
    this.loadModel()
  }


  initScene() {
    return new THREE.Scene()
  }

  initCamera() {
    const { clientWidth, clientHeight } = this.container;
    const { x = 0, y = 0, z = 500 } = this.modelInfo.cameraPosition || {}
    const camera = new THREE.PerspectiveCamera(45, clientWidth / clientHeight, 0.1, 1000);

    camera.position.set(x, y, z);

    return camera
  }

  initRenderer() {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const { clientWidth, clientHeight } = this.container;
    renderer.setSize(clientWidth, clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(renderer.domElement);

    return renderer
  }

  initLight() {
    const { ambientLightIntensity = 1 } = this.modelInfo;
    const ambientLight = new THREE.AmbientLight(0x404040, ambientLightIntensity); // 微弱环境光
    this.scene.add(ambientLight);
  }

  initControls() {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = Math.PI / 2;
    controls.enablePan = false;
    controls.enableZoom = false;

    return controls
  }

  initComposer() {
    const { exposure } = this.modelInfo;

    if (exposure === null) return

    const composer = new EffectComposer(this.renderer);
    composer.addPass(new RenderPass(this.scene, this.camera));

    const exposurePass = new ShaderPass(ExposureShader);
    exposurePass.uniforms.exposure.value = exposure || 3.6;
    composer.addPass(exposurePass);

    return composer
  }

  async loadModel() {
    const { model, mixer } = await this.modelLoader.loadModal()
    this.mixer = mixer

    this.scene.add(model);
  }

  render(time: number = 0) {
    // 计算增量时间
    const deltaTime = time - this._previousTime;
    this._previousTime = time;
    if (this.mixer) {
      this.mixer.update(deltaTime * 0.001)
    }

    if (this.controls) {
      this.controls.update()
    }

    if (this.composer) {
      this.composer.render()
    } else {
      this.renderer.render(this.scene, this.camera);
    }

    requestAnimationFrame(this.renderCallback);
  }
}