import React, { FC, useEffect, useRef } from "react";
import Viewer3D from "@/components/Viewer3D";
import cannon from "@/assets/three/cannon.png"
import castle from "@/assets/three/castle.png"
import { OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

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
  }
]

const imgList = [
  { img: '/image/pictureShow/cannon.png', name: 'cannon' },
  { img: '/image/pictureShow/castle.png', name: 'castle' },
]

const ShowModels: FC = () => {


  return (
    <div>
      {/* TODO: 使用 swiper 来展示 */}
      {
        modelList.map((modelInfo, index) => {
          return (
            <Viewer3D
              key={index}
              modelInfo={modelInfo}
            />
          )
        })
      }

      <div>
        {
          imgList.map((imgInfo, index) => {
            return (
              <img style={{ width: '400px', aspectRatio: '1164/726' }} key={index} src={imgInfo.img} alt={imgInfo.name} />
            )
          })
        }
      </div>
    </div>
  );
}

export default ShowModels