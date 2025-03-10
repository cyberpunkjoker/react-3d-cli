import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './entry';

// 判断是否添加 mock 环境变量
async function enableMocking() {
  if (process.env.MOCK_ENV !== 'MOCK') return

  const { worker } = await import('@/__mock__/client')
  return worker.start()
}

export async function bootstrap() {
  const rootEl = document.createElement('div');
  rootEl.classList.add('cofe-app-root');
  const root = createRoot(rootEl!);
  document.body.appendChild(rootEl);

  await enableMocking()

  root.render(<App />);
}

bootstrap();