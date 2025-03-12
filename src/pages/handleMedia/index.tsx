import UploadComp, { UploadCbFileType } from "@/components/Upload";
import { useImageResizer } from "@/hooks/handleMedia/useResizeImg";
import React, { FC, useEffect, useRef, useState } from "react";

const HandleMedia: FC = () => {
  const [compressFile, setcompressFile] = useState<string | File>();

  const { resizedFile, resizeImageToTargetSize } = useImageResizer();

  const showImageRef = useRef(null)

  useEffect(() => {
    if (!compressFile) return;

    resizeImageToTargetSize(compressFile, 10)
  }, [compressFile])


  return (
    <div>
      <h1>Handle Picture</h1>

      {!resizedFile
        ? <UploadComp
          local
          cbFileType="file"
          setUrl={setcompressFile}
        />
        : (
          <div>
            <div>压缩前图片大小：{(compressFile as File).size / 1024}KB</div>
            <div>压缩后图片大小：{resizedFile.size / 1024}KB</div>
            <img width={400} height={400} ref={showImageRef} src={resizedFile && URL.createObjectURL(resizedFile)} alt="" />
          </div>
        )
      }


    </div>
  )
}

export default HandleMedia;