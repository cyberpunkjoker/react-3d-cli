import { message } from 'antd';
import axios from 'axios';

const API_URL = 'https://pic.lazytoki.cn/api/v1';

export const getTokens = async () => {
  const response = await axios.post(API_URL + '/tokens', {
    email: '592703320@qq.com',
    password: 'eGzp9RQJWhDhakN4zJ34'  
  });

  return response.data;
}

export const uploadFile = async (file: File, token: string) => {
  try {
    const res = await axios.post(API_URL + '/upload', { file }, {
      headers: {
        'Content-Type':'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    })

    return res.data
  } catch (error) {
    message.error('上传失败，请稍后再试')
  }
  
}