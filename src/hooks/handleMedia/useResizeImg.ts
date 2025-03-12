import { useState } from 'react';
import pica from 'pica';

export function useImageResizer() {
  const [resizedFile, setResizedFile] = useState(null);

  const resizeImageToTargetSize = async (file, targetSizeKB) => {
    const picaInstance = pica();
    const img = document.createElement('img');

    img.src = URL.createObjectURL(file);

    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    let quality = 0.9;
    let resizedBlob;

    // 递归尝试不同的压缩率，直到达到指定大小
    while (quality > 0.1) {
      await picaInstance.resize(img, canvas);
      resizedBlob = await picaInstance.toBlob(canvas, 'image/jpeg', quality);

      if (resizedBlob.size / 1024 <= targetSizeKB) {
        break;
      }
      quality -= 0.05; // 每次降低质量，逐步接近目标大小
    }

    const resizedFile = new File([resizedBlob], `resized_${file.name}`, {
      type: 'image/jpeg',
      lastModified: Date.now(),
    });

    console.log('compressed file size:', resizedFile.size);

    setResizedFile(resizedFile);
  };

  return { resizedFile, resizeImageToTargetSize };
}