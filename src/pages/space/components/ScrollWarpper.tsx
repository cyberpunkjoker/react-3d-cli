import React, { FC, useEffect, useRef } from 'react';
import ScrollBg from './ScrollBg';
import Viewer3D from "@/components/Viewer3D";

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
    zoom: 1.4,
    modelRotation: {
      y: Math.PI * 1,
      x: Math.PI * 0.5,
      z: Math.PI * 1,
    },
    modelPosition: {
      y: -1.6
    }
  }
]


const ScrollWarpper: FC = () => {
  const warpperRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!warpperRef.current) return;

    const scrollBg = new ScrollBg(
      warpperRef.current,
      [
        'https://cdn.pixabay.com/photo/2015/03/08/10/18/landscape-664014_960_720.jpg',
        'https://media.istockphoto.com/id/2156643057/photo/higgins-lake-sun-pillar-sunset.jpg?s=1024x1024&w=is&k=20&c=gLKoEKJvwd9G4SOIZlH95CZePVMqcnUB0d2s1-36-s8=',
        'https://media.istockphoto.com/id/2153573059/photo/mountain-covered-with-a-coniferous-fir-tree-forest-scenic-landscape-from-carpathian-mountains.jpg?s=1024x1024&w=is&k=20&c=hwDTriUtxDP_4A6jQKVRWTTTXLf8jim4w3w1K2dcaHU=',
        'https://cdn.pixabay.com/photo/2015/03/08/10/18/landscape-664014_960_720.jpg',
        'https://media.istockphoto.com/id/2156643057/photo/higgins-lake-sun-pillar-sunset.jpg?s=1024x1024&w=is&k=20&c=gLKoEKJvwd9G4SOIZlH95CZePVMqcnUB0d2s1-36-s8=',
        'https://media.istockphoto.com/id/2153573059/photo/mountain-covered-with-a-coniferous-fir-tree-forest-scenic-landscape-from-carpathian-mountains.jpg?s=1024x1024&w=is&k=20&c=hwDTriUtxDP_4A6jQKVRWTTTXLf8jim4w3w1K2dcaHU=', 'https://cdn.pixabay.com/photo/2015/03/08/10/18/landscape-664014_960_720.jpg',
        'https://media.istockphoto.com/id/2156643057/photo/higgins-lake-sun-pillar-sunset.jpg?s=1024x1024&w=is&k=20&c=gLKoEKJvwd9G4SOIZlH95CZePVMqcnUB0d2s1-36-s8=',
        'https://media.istockphoto.com/id/2153573059/photo/mountain-covered-with-a-coniferous-fir-tree-forest-scenic-landscape-from-carpathian-mountains.jpg?s=1024x1024&w=is&k=20&c=hwDTriUtxDP_4A6jQKVRWTTTXLf8jim4w3w1K2dcaHU=', 'https://cdn.pixabay.com/photo/2015/03/08/10/18/landscape-664014_960_720.jpg',
        'https://media.istockphoto.com/id/2156643057/photo/higgins-lake-sun-pillar-sunset.jpg?s=1024x1024&w=is&k=20&c=gLKoEKJvwd9G4SOIZlH95CZePVMqcnUB0d2s1-36-s8=',
        'https://media.istockphoto.com/id/2153573059/photo/mountain-covered-with-a-coniferous-fir-tree-forest-scenic-landscape-from-carpathian-mountains.jpg?s=1024x1024&w=is&k=20&c=hwDTriUtxDP_4A6jQKVRWTTTXLf8jim4w3w1K2dcaHU=',
        'https://cdn.pixabay.com/photo/2015/03/08/10/18/landscape-664014_960_720.jpg',
        'https://media.istockphoto.com/id/2156643057/photo/higgins-lake-sun-pillar-sunset.jpg?s=1024x1024&w=is&k=20&c=gLKoEKJvwd9G4SOIZlH95CZePVMqcnUB0d2s1-36-s8=',
        'https://media.istockphoto.com/id/2153573059/photo/mountain-covered-with-a-coniferous-fir-tree-forest-scenic-landscape-from-carpathian-mountains.jpg?s=1024x1024&w=is&k=20&c=hwDTriUtxDP_4A6jQKVRWTTTXLf8jim4w3w1K2dcaHU=', 'https://cdn.pixabay.com/photo/2015/03/08/10/18/landscape-664014_960_720.jpg',
        'https://media.istockphoto.com/id/2156643057/photo/higgins-lake-sun-pillar-sunset.jpg?s=1024x1024&w=is&k=20&c=gLKoEKJvwd9G4SOIZlH95CZePVMqcnUB0d2s1-36-s8=',
        'https://media.istockphoto.com/id/2153573059/photo/mountain-covered-with-a-coniferous-fir-tree-forest-scenic-landscape-from-carpathian-mountains.jpg?s=1024x1024&w=is&k=20&c=hwDTriUtxDP_4A6jQKVRWTTTXLf8jim4w3w1K2dcaHU=', 'https://cdn.pixabay.com/photo/2015/03/08/10/18/landscape-664014_960_720.jpg',
        'https://media.istockphoto.com/id/2156643057/photo/higgins-lake-sun-pillar-sunset.jpg?s=1024x1024&w=is&k=20&c=gLKoEKJvwd9G4SOIZlH95CZePVMqcnUB0d2s1-36-s8=',
        'https://media.istockphoto.com/id/2153573059/photo/mountain-covered-with-a-coniferous-fir-tree-forest-scenic-landscape-from-carpathian-mountains.jpg?s=1024x1024&w=is&k=20&c=hwDTriUtxDP_4A6jQKVRWTTTXLf8jim4w3w1K2dcaHU=', 'https://cdn.pixabay.com/photo/2015/03/08/10/18/landscape-664014_960_720.jpg',
        'https://media.istockphoto.com/id/2156643057/photo/higgins-lake-sun-pillar-sunset.jpg?s=1024x1024&w=is&k=20&c=gLKoEKJvwd9G4SOIZlH95CZePVMqcnUB0d2s1-36-s8=',
        'https://media.istockphoto.com/id/2153573059/photo/mountain-covered-with-a-coniferous-fir-tree-forest-scenic-landscape-from-carpathian-mountains.jpg?s=1024x1024&w=is&k=20&c=hwDTriUtxDP_4A6jQKVRWTTTXLf8jim4w3w1K2dcaHU=', 'https://cdn.pixabay.com/photo/2015/03/08/10/18/landscape-664014_960_720.jpg',
        'https://media.istockphoto.com/id/2156643057/photo/higgins-lake-sun-pillar-sunset.jpg?s=1024x1024&w=is&k=20&c=gLKoEKJvwd9G4SOIZlH95CZePVMqcnUB0d2s1-36-s8=',
        'https://media.istockphoto.com/id/2153573059/photo/mountain-covered-with-a-coniferous-fir-tree-forest-scenic-landscape-from-carpathian-mountains.jpg?s=1024x1024&w=is&k=20&c=hwDTriUtxDP_4A6jQKVRWTTTXLf8jim4w3w1K2dcaHU=', 'https://cdn.pixabay.com/photo/2015/03/08/10/18/landscape-664014_960_720.jpg',
        'https://media.istockphoto.com/id/2156643057/photo/higgins-lake-sun-pillar-sunset.jpg?s=1024x1024&w=is&k=20&c=gLKoEKJvwd9G4SOIZlH95CZePVMqcnUB0d2s1-36-s8=',
        'https://media.istockphoto.com/id/2153573059/photo/mountain-covered-with-a-coniferous-fir-tree-forest-scenic-landscape-from-carpathian-mountains.jpg?s=1024x1024&w=is&k=20&c=hwDTriUtxDP_4A6jQKVRWTTTXLf8jim4w3w1K2dcaHU=', 'https://cdn.pixabay.com/photo/2015/03/08/10/18/landscape-664014_960_720.jpg',
        'https://media.istockphoto.com/id/2156643057/photo/higgins-lake-sun-pillar-sunset.jpg?s=1024x1024&w=is&k=20&c=gLKoEKJvwd9G4SOIZlH95CZePVMqcnUB0d2s1-36-s8=',
        'https://media.istockphoto.com/id/2153573059/photo/mountain-covered-with-a-coniferous-fir-tree-forest-scenic-landscape-from-carpathian-mountains.jpg?s=1024x1024&w=is&k=20&c=hwDTriUtxDP_4A6jQKVRWTTTXLf8jim4w3w1K2dcaHU=', 'https://cdn.pixabay.com/photo/2015/03/08/10/18/landscape-664014_960_720.jpg',
        'https://media.istockphoto.com/id/2156643057/photo/higgins-lake-sun-pillar-sunset.jpg?s=1024x1024&w=is&k=20&c=gLKoEKJvwd9G4SOIZlH95CZePVMqcnUB0d2s1-36-s8=',
        'https://media.istockphoto.com/id/2153573059/photo/mountain-covered-with-a-coniferous-fir-tree-forest-scenic-landscape-from-carpathian-mountains.jpg?s=1024x1024&w=is&k=20&c=hwDTriUtxDP_4A6jQKVRWTTTXLf8jim4w3w1K2dcaHU=',
      ]
    );
    return () => {
      scrollBg.removeListeners();
    }
  }, [warpperRef])

  return (
    <div className='w-full h-[800px]' ref={warpperRef}>
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
  )
}

export default ScrollWarpper;