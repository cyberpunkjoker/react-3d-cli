import { Application, Assets, Texture, Container,  } from 'pixi.js';
import type { ContainerOptions, ApplicationOptions } from "pixi.js"


type Partial<T> = {
  [P in keyof T]?: T[P];
};

class BatchLoadAssets {
  constructor() {}

  /** 批量加载资源
   * @param urls 资源列表
   * @param retries 重试次数
   */
  async getAssets(urls: Array<string>, retries = 0) {
    if (Array.isArray(urls)) {
      const promises = urls.map((url) => this.loadWithRetry(url, retries))
      
      await Promise.allSettled(promises)
    }
  }

  async loadWithRetry(url: string, retries: number, name?: string) {
    try {
      await Assets.load(url);
    } catch (error) {
      if (retries > 0) {
        this.loadWithRetry(url, retries - 1);
      } else {
        console.error(`Failed to load asset after ${retries} retries: ${url}`);
      }
    }
  }
}

class BaseInitPixi extends BatchLoadAssets {
  app: Application;
  texture: Texture;
  container: Container;

  constructor() {
    super()
  }
  
  public async initCanavs (warp: HTMLElement, initOpts?: Partial<ApplicationOptions>) {
    const app = new Application()
    await app.init({
      width: 1200,
      height: 800,
      ...initOpts,
    })
  
    warp.appendChild(app.canvas)
    this.app = app
  }

  public async getTexture (url: string | Array<string>, retries: number = 0 ) {
    if (Array.isArray(url)) {
      this.getAssets(url, retries)
    } else {
      this.texture = await Assets.load(url)
    }
  }

  public setContainer (options?: ContainerOptions) {
    this.container = new Container(options || {})
  }
}

export default BaseInitPixi