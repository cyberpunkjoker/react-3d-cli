import { ModelInfoProps, ModelViewer } from "@/utils/models/models";
import classNames from "classnames";
import React, { FC, useEffect, useRef } from "react";

interface Viewer3DProps {
  modelInfo: ModelInfoProps;
  className?: string;
}

const Viewer3D: FC<Viewer3DProps> = (props) => {
  const { modelInfo, className } = props
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewer = new ModelViewer(viewerRef.current, modelInfo)
    viewer.render()
  }, [])

  return (
    <div className={classNames([className])} ref={viewerRef}>
    </div>
  )
}

export default Viewer3D;