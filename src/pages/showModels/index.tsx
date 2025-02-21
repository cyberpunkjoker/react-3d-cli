import React, { FC, useEffect, useRef } from "react";
import Viewer3D from "@/components/Viewer3D";
import cannon from "@/assets/three/cannon.png"
import castle from "@/assets/three/castle.png"
import { OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import vertexShader from '@/glsl/test/vertex.glsl';
import fragmentShader from '@/glsl/test/fragment.glsl';

import * as THREE from 'three';


const modelList = [
  {
    modelUrl: '/models/lewis_walk.fbx',
    textureUrl: '/models/textures/Lewis.png',
    zoom: 2.2,
  },
  {
    modelUrl: '/models/building.fbx',
    textureUrl: '/models/textures/building_base.png',
    zoom: 2.2,
    cameraPosition: { x: 0, y: 0, z: 70 },
    exposure: 50
  },
  {
    modelUrl: '/models/kaya.glb',
    cameraPosition: { x: 0, y: 0, z: 5 },
    zoom: 2,
    exposure: null,
    ambientLightIntensity: 70
  },
  {
    modelUrl: '/models/flying_knee_punch.fbx',
    exposure: 70,
    zoom: 0.8,
  },
  {
    modelUrl: '/models/good_night.FBX',
    exposure: 70,
    zoom: 2,
  }
]


const ShowModels: FC = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 创建一个立方体几何体
    const geometry = new THREE.BoxGeometry();

    // 创建一个自定义着色器材质
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
    });

    // 创建一个网格对象（立方体）
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // 设置相机位置
    camera.position.z = 5;

    // 渲染循环
    const animate = function () {
      requestAnimationFrame(animate);

      // 动画：旋转立方体
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();
  }, [])
  return (
    <div>
      {/* TODO: 使用 swiper 来展示 */}
      {
        modelList.map((modelInfo, index) => {
          return (
            <Viewer3D
              className="w-full h-[25rem]"
              key={index}
              modelInfo={modelInfo}
            />
          )
        })
      }

    </div>
  );
}

export default ShowModels