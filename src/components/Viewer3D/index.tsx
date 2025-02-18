import { ModelInfoProps, ModelViewer } from "@/utils/models/models";
import React, { FC, useEffect, useRef } from "react";

interface Viewer3DProps {
  modelInfo: ModelInfoProps;
}

const Viewer3D: FC<Viewer3DProps> = (props) => {
  const { modelInfo } = props
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewer = new ModelViewer(viewerRef.current, modelInfo)
    viewer.render()
  }, [])

  return (
    <div style={{ width: '100%', height: '400px' }} ref={viewerRef}></div>
  )
}

export default Viewer3D;