import UploadComp, { UploadCbFileType } from "@/components/Upload";
import { useImageResizer } from "@/hooks/handleMedia/useResizeImg";
import { getWavMetadata } from "@/utils/handleMuisc";
import React, { FC, useEffect, useRef, useState } from "react";

const HandleMedia: FC = () => {
  const [compressFile, setcompressFile] = useState<string | File>();
  const [wavformFile, setwavformFile] = useState<string | File>();

  const { resizedFile, resizeImageToTargetSize } = useImageResizer();

  const showImageRef = useRef(null)

  useEffect(() => {
    if (!compressFile) return;

    resizeImageToTargetSize(compressFile, 10)
  }, [compressFile])


  useEffect(() => {
    if (!wavformFile) return;
    getWavMetadata(wavformFile as File)
  }, [wavformFile])

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

      <h1>Handle Miuse MetaData</h1>
      <UploadComp
        local
        cbFileType="file"
        setUrl={setwavformFile}
      ></UploadComp>
    </div>
  )
}

export default HandleMedia;