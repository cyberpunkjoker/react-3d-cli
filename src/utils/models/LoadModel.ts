import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

type ModelType = THREE.FBX | THREE.glb;

interface OLoadModelProps {
  mixer?: THREE.AnimationMixer;
  model?: ModelType;
}

enum ModelEnum {
  FBX = 'fbx',
  GLB = 'glb'
}

export class LoadModel {
  private fileType: ModelEnum;
  constructor(
    private modelUrl: string,
    private textureUrl?: string,
    private zoom?: number,
  ) {
  }

  async loadModal(): Promise<OLoadModelProps> {

    const str = this.modelUrl.toLocaleLowerCase()
    const isFbx = str.endsWith('.fbx')
    const isGlb = str.endsWith('.glb')

    if (isFbx) {
      this.fileType = ModelEnum.FBX
      return await this.loadFbxModel()
    }
    if (isGlb) {
      this.fileType = ModelEnum.GLB
      return await this.loadGlbModel()
    }
  }

  centerModel(fbx: ModelType) {
    if (this.zoom) {
      fbx.scale.set(this.zoom, this.zoom, this.zoom);
    }

    const boundingBox = new THREE.Box3().setFromObject(fbx);
    const center = boundingBox.getCenter(new THREE.Vector3());
    fbx.position.sub(center);
  }

  addModelAnimation(fbx: ModelType) {
    let animations: THREE.AnimationClip[] = [];
    let mixer: THREE.AnimationMixer

    if (this.fileType === ModelEnum.FBX) {
      mixer = new THREE.AnimationMixer(fbx);
    }
    if (this.fileType === ModelEnum.GLB) {
      mixer = new THREE.AnimationMixer(fbx.scene);
    }

    animations = fbx.animations;

    animations.forEach((ani) => {
      const action = mixer?.clipAction(ani);
      action?.play();
      action?.setLoop(THREE.LoopRepeat, Infinity);
    });

    return mixer
  }

  loadTexture() {
    const textureLoader = new THREE.TextureLoader();
    const textureNormal = textureLoader.load(this.textureUrl);

    return textureNormal;
  }

  async loadFbxModel() {
    return new Promise((resolve, reject) => {
      const loader = new FBXLoader();
      const texture = this.loadTexture();

      loader.load(this.modelUrl, (fbx) => {
        fbx.traverse((child) => {
          const newMaterial = new THREE.MeshStandardMaterial({
            map: texture
          });

          child.material = newMaterial;
        });

        this.centerModel(fbx);
        const mixer = this.addModelAnimation(fbx);

        resolve({
          model: fbx,
          mixer
        })
      })
    })
  }

  async loadGlbModel() {
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader();

      loader.load(this.modelUrl, (gltf) => {
        this.centerModel(gltf.scene);
        const mixer = this.addModelAnimation(gltf);

        resolve({
          model: gltf.scene,
          mixer: mixer
        })
      })
    })
  }

}