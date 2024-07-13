import { Application, MeshPlane, Assets, Texture, Buffer } from 'pixi.js';

class BaseInitPixi {
  app: Application;
  texture: Texture;

  constructor() {}
  
  public async initCanavs (warp: HTMLElement) {
    const app = new Application()
    await app.init({
      width: 1200,
      height: 800,
    })
  
    warp.appendChild(app.canvas)
    this.app = app
  }

  public async getTexture (url: string) {
    this.texture = await Assets.load(url)
  }
}


class MashPlanFlow extends BaseInitPixi {
  plane: MeshPlane
  buffer: Buffer

  constructor() {
    super()
  }

  private async getPlaneBuffer () {
    const { buffer } = this.plane.geometry.getAttribute('aPosition')

    this.buffer = buffer
  }

  public getMashPlan () {
    this.plane = new MeshPlane({
      texture: this.texture,
      verticesX: 10,
      verticesY: 10,
    })
    this.plane.x = 100
    this.plane.y = 100

    this.getPlaneBuffer()
    this.app.stage.addChild(this.plane)
  }

  public renderMashPlan () {
    let timer = 0
    this.app.ticker.add(() => {
      for (let i = 0; i < this.buffer.data.length; i++) {
        this.buffer.data[i] += Math.sin(timer / 10 + i) * 0.5
      }
  
      this.buffer.update()
      timer++
    })
  }
   

}


const renderMash = async (warp: HTMLElement) => {
  const mashPlan = new MashPlanFlow()

  await mashPlan.initCanavs(warp)

  await mashPlan.getTexture('https://pixijs.com/assets/bg_grass.jpg')

  mashPlan.getMashPlan()

  mashPlan.renderMashPlan()
}

export default renderMash