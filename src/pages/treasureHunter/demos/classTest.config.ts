import { Application, Assets, Container, Rectangle, Sprite, Texture } from 'pixi.js';
import { maggotAttribute } from "./index.type"

interface SpriteExtra extends Sprite, maggotAttribute {}

class RenderCanvas {
  app: Application
  texture: Texture
  container: Container
  maggots: SpriteExtra[]
  dudeBounds: Rectangle

  constructor () {
    this.maggots = []
  }

  private setTextureAttr () {
    const sprite: SpriteExtra = new Sprite(this.texture)
    sprite.anchor.set(0.5)
    sprite.scale.set(0.8 + Math.random() * 0.3)

    sprite.x = Math.random() * this.app.screen.width
    sprite.y = Math.random() * this.app.screen.height

    sprite.tint = Math.random() * 0xffffff

    sprite.direction = Math.random() * Math.PI * 2
    sprite.turningSpeed = Math.random() - 0.8
    sprite.speed = (2 + Math.random() * 2) * 0.2
    sprite.offset = Math.random() * 100

    return sprite
  }

  private boundaryCheck (dude: SpriteExtra) {
    if ( dude.x < this.dudeBounds.x ) {
      dude.x = this.dudeBounds.x
    }
    if (dude.x > this.dudeBounds.x + this.dudeBounds.width) {
      dude.x -= this.dudeBounds.width
    }

    if ( dude.y < this.dudeBounds.y ) {

      dude.y += this.dudeBounds.y
    }

    if (dude.y > this.dudeBounds.y + this.dudeBounds.height) {
      dude.y -= this.dudeBounds.height
    }
  }

  private changeAttrToMove (dude: SpriteExtra, tick: number) {
    // 蠕动效果
    dude.scale.y = 0.95 + Math.sin(tick + dude.offset) * 0.05
    dude.direction += dude.turningSpeed * 0.01

    dude.x += Math.sin(dude.direction) * (dude.speed * dude.scale.y);
    dude.y += Math.cos(dude.direction) * (dude.speed * dude.scale.y);

    dude.rotation = -dude.direction + Math.PI

    this.boundaryCheck(dude)
  }

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

  public createContainer () {
    this.container = new Container()

    this.app.stage.addChild(this.container)
  }

  public addSpriteToContainer (num: number) {
    for (let i = 0; i < num; i++) {
      const sprite = this.setTextureAttr()

      this.maggots.push(sprite)
      this.container.addChild(sprite)
    }
  }

  public createBounds (dudeBoundsPadding: number = 100) {
    this.dudeBounds = new Rectangle(
      -dudeBoundsPadding,
      -dudeBoundsPadding,
      this.app.screen.width + dudeBoundsPadding * 2,
      this.app.screen.height + dudeBoundsPadding * 2,
     );
  }

  public animationLoop () {
    let tick = 0
    this.app.ticker.add(() => {
      for (let i = 0; i < this.maggots.length; i++) {
        const dude = this.maggots[i]
        this.changeAttrToMove(dude, tick)
      }
      tick += 0.1
    })
  }

}

const toRenderCanvas = async (warp: HTMLElement) => {
  const canvas = new RenderCanvas()

  await canvas.initCanavs(warp)

  await canvas.getTexture("https://pixijs.com/assets/maggot_tiny.png")

  canvas.createContainer()

  canvas.addSpriteToContainer(10000)

  canvas.createBounds(80)

  canvas.animationLoop()
}


export default toRenderCanvas