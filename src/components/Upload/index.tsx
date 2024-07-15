import React, { useEffect } from "react";
import { message, Upload } from 'antd';
import type { UploadProps } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { getTokens, uploadFile } from '@/services/upload';
import { setSesionStorage, getSesionStorage, SessionEnum } from "@/storage/sessionStorage";
const { Dragger } = Upload;

interface UploadCompProps {
  setUrl: (url: string) => void;
  /**本地，不走oss */
  local?: boolean;
}

const UploadComp: React.FC<UploadCompProps> = (props) => {
  const { setUrl, local= false } = props
  const [token, setToken] = React.useState('')

  useEffect(() => {
    const ossToken = getSesionStorage(SessionEnum.OSS_TOKEN)
    if (!ossToken && !local) {
      initOss()
    }
  }, [])

  const initOss = async () => {
    const res = await getTokens()
    setToken(res.data.token)
    setSesionStorage(SessionEnum.OSS_TOKEN, res.data.token)
  }

  const blobToBase64 = async (blob: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener('load', ()=> {
        resolve(reader.result);
      });
      reader.readAsDataURL(blob);
    })
  }

  const customRequest = async (e: any) => {

    if (local) {
      const url = await blobToBase64(e.file) as string
      setUrl(url)
      return
    }

    uploadFile(e.file, token)
    .then((res) => {
      console.log('上传成功', res.data);
      e.onSuccess(res.data, e);
      const url = res.data.links.url
      setUrl(url)
    })
    .catch((err) => {
      e.onError(err);
      initOss()
    });
  }

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    // action: 'https://pic.lazytoki.cn/api/v1',
    customRequest: customRequest,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  
  return (
    <Dragger {...uploadProps}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
        banned files.
      </p>
    </Dragger>
  )
};

export default UploadComp;