import React, { useEffect, useLayoutEffect, useState } from 'react';
import UploadComp from '@/components/Upload';
// import loadable from '@loadable/component';

const Panorama: React.FC = () => {
  const [uploadUrl, setUploadUrl] = useState('');

  useEffect(() => {
    if (uploadUrl) {
      pannellumViewer();
    }
  }, [uploadUrl])

  const pannellumViewer = () => {
    new (window as any).pannellum.viewer('viewer', {
      "type": "equirectangular",
      "panorama": uploadUrl
    });
  }

  return (
    <>
     <UploadComp setUrl={setUploadUrl}></UploadComp>
     <div id='viewer' style={{width: '600px', height: '400px'}}></div>
    </>
  )
}

export default Panorama;