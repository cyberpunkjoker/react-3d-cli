import { WaveFile } from 'wavefile';

export async function getWavMetadata(file) {
  // 读取 File/Blob 为 ArrayBuffer
  const arrayBuffer = await file.arrayBuffer();

  // 创建 WaveFile 实例并解析数据
  const wav = new WaveFile(new Uint8Array(arrayBuffer));

  const metadata = wav.fmt as Dict

  // 提取头部信息
  console.log('🎵 音频格式:', metadata.audioFormat === 1 ? 'PCM (未压缩)' : '非 PCM 格式');
  console.log('🕒 时长 (秒):', (wav.data as Dict).samples.length / metadata.sampleRate);
  console.log('🎚️ 采样率 (Hz):', metadata.sampleRate);
  console.log('🔊 声道数:', metadata.numChannels);
  console.log('🧱 位深度 (bit depth):', metadata.bitsPerSample);
  console.log('📈 数据块对齐 (blockAlign):', metadata.blockAlign);
  console.log('🔢 字节率 (byteRate):', metadata.byteRate);
}