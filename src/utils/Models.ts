import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { ExposureShader } from 'three/examples/jsm/shaders/ExposureShader.js';
import { RefObject, useEffect, useRef, useState } from 'react';
import { OrbitControls, TGALoader } from 'three/examples/jsm/Addons.js';


declare interface ModelInfo {
  source: string;
  texture?: string;
  rotate?: { x?: number; y?: number; z?: number };
  isTrackballControlls?: boolean;
  /** 初始位置偏移倍率，以模型默认大小为基准 */
  offsetPower?: { x?: number; y?: number; z?: number };
  zoom?: number;
  orbitAngle?: {
    minPolarAngle?: number;
    maxPolarAngle?: number;
    minAzimuthAngle?: number;
    maxAzimuthAngle?: number;
  };
  cameraPosition?: { x?: number; y?: number; z?: number };
  playAni?: boolean;
  deltaRatio?: number;
  exposure?: number | null;
  toneMappingExposure?: number;
  colorSpace?: THREE.ColorSpace;
  ambientLightIntensity?: number;
}

export class ModelViewer {
  private scene!: THREE.Scene;
  private camera!: THREE.Camera;
  private model!: THREE.Group<THREE.Object3DEventMap>;
  private renderer!: THREE.WebGLRenderer;
  private controls!: TrackballControls | OrbitControls;
  private rafId = 0;
  private mixer?: THREE.AnimationMixer;
  private lastEl = 0;
  private composer!: EffectComposer;
  private renderCallback!: () => void;

  constructor(private container: HTMLElement, private modelInfo: ModelInfo) {
    this.renderCallback = this.render.bind(this);
  }

  init() {
    this.scene = this.initScene();
    this.camera = this.initCamera();
    this.initLight();
    this.loadModel();
    this.renderer = this.initRenderer();


    // const composer = new EffectComposer(this.renderer);
    // composer.addPass(new RenderPass(this.scene, this.camera));

    // const exposurePass = new ShaderPass(ExposureShader);
    // // exposurePass.uniforms.exposure.value = exposure || 5.6; // 设置曝光度，值越高，亮度越高
    // composer.addPass(exposurePass);
    // this.composer = composer;
  }

  initScene() {
    const scene = new THREE.Scene();
    return scene;
  }

  initCamera() {
    const { clientWidth, clientHeight } = this.container;
    const camera = new THREE.PerspectiveCamera(45, clientWidth / clientHeight, 1, 1000);
    // camera.position.set(x || 0, y || 0, z || 500);
    return camera;
  }

  initLight() {
    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Light) {
        this.scene.remove(obj);
      }
    });

    const { ambientLightIntensity } = this.modelInfo;
    const amLight = new THREE.AmbientLight(0xffffff, ambientLightIntensity || 1);
    this.scene.add(amLight);
  }

  loadModel() {
    return new Promise<THREE.Group<THREE.Object3DEventMap>>((resolve) => {
      const manager = new THREE.LoadingManager();
      manager.addHandler(/\.tga$/i, new TGALoader());
      manager.addHandler(/\.png$/i, new THREE.TextureLoader());
      const { source, texture } = this.modelInfo;

      let loader: FBXLoader | GLTFLoader | null = new FBXLoader(manager);
      // const isFBX = source.toLowerCase().endsWith('fbx');
      // let isGLTF = false;
      // if (isFBX) {
      //   loader = new FBXLoader(manager);
      // } else {
      //   isGLTF = /\.(glb|gltf)$/.test(source.toLowerCase());
      //   if (isGLTF) {
      //     loader = new GLTFLoader(manager);
      //   }
      // }

      if (!loader) return null;

      loader.load(
        source,
        (res) => {
          let loadedModel: THREE.Group<THREE.Object3DEventMap> | null = null;

          // if (isFBX) {
          loadedModel = res as any;
          // } else if (isGLTF) {
          //   loadedModel = (res as GLTF).scene;
          // }

          if (!loadedModel) return;

          let textureNormal: THREE.Texture | null = null;

          // if (texture) {
          //   let textureLoader: THREE.TextureLoader;
          //   if (texture.match(/\.tga$/i)) {
          //     textureLoader = new TGALoader();
          //   } else {
          //     textureLoader = new THREE.TextureLoader();
          //   }
          //   textureNormal = textureLoader.load(texture);
          // }

          loadedModel.traverse((v: any) => {
            // if (!v.isMesh || !textureNormal) return;

            // const newMaterial = v.material.clone();
            // v.material = newMaterial;
            // v.material.map = textureNormal;
            // v.material.metalness = 0;
          });

          // const box = new THREE.Box3();
          // const {
          //   max: { x, y, z },
          // } = box.expandByObject(loadedModel);
          // const { rotate, offsetPower, zoom = 1 } = this.modelInfo;
          // const { x: opx = 0, y: opy = 0, z: opz = 0 } = offsetPower || {};
          // loadedModel.position.x = x * opx;
          // loadedModel.position.y = y * opy;
          // loadedModel.position.z = z * opz;

          // const { x: rx = 0, y: ry = 0, z: rz = 0 } = rotate || {};
          // loadedModel.rotateX(rx);
          // loadedModel.rotateY(ry);
          // loadedModel.rotateX(rz);
          // loadedModel.scale.set(zoom, zoom, zoom);

          this.scene.add(loadedModel);
          this.model = loadedModel;

        },
        undefined,
        (err) => {
          console.log('load error:', source, err);
        },
      );
    });
  }

  initRenderer() {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); //设置抗锯齿
    //设置屏幕像素比
    // renderer.setPixelRatio(window.devicePixelRatio);
    //渲染的尺寸大小
    const { clientHeight, clientWidth } = this.container;
    renderer.setSize(clientWidth, clientHeight);
    //色调映射
    // renderer.toneMapping = THREE.ReinhardToneMapping;
    // renderer.autoClear = true;

    // const { colorSpace, toneMappingExposure } = this.modelInfo;
    // renderer.outputColorSpace = colorSpace || THREE.SRGBColorSpace;
    // renderer.toneMappingExposure = toneMappingExposure || 1.0;

    // //曝光
    // renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(renderer.domElement);
    return renderer;
  }


  render(el = performance.now()) {
    if (this.lastEl === 0) {
      this.lastEl = el;
    }

    this.rafId = requestAnimationFrame(this.renderCallback);
    // this.controls.update();
    if (this.mixer) {
      this.mixer.update((el - this.lastEl) * (this.modelInfo.deltaRatio || 1 / 1200));
    }

    if (this.composer) {
      this.composer.render();
    } else {
      this.renderer.render(this.scene, this.camera);
    }
    this.lastEl = el;
  }

  reset() {
    this.controls.reset();
    this.camera.lookAt(0, 0, 0);
  }

  dispose() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }

    this.scene?.traverse((v) => {
      if (v.type === 'Mesh') {
        (v as any).geometry.dispose();
        (v as any).material.dispose();
      }
    });

    this.container.removeChild(this.renderer.domElement);
    this.scene.clear();
    this.renderer.clear();
    this.renderer.dispose();
    this.camera.clear();
  }
}

export default function useModelView(containerRef: RefObject<HTMLDivElement>, model: ModelInfo) {
  const modelViewer = useRef<ModelViewer>();

  useEffect(() => {
    if (!containerRef.current) return;

    const viewer = new ModelViewer(containerRef.current, model);

    viewer.init();
    viewer.render();
    modelViewer.current = viewer;

    return () => viewer.dispose();
  });

  return { reset: () => modelViewer.current?.reset() };
}
