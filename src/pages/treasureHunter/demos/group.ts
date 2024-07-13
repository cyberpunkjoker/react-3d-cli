import { Sprite } from "pixi.js";
import BaseInitPixi from "../base";

class GroupDemo extends BaseInitPixi {
  /** 世界地图尺寸 */
  worldSize: number;
  mouseX: number = 0;
  mouseY: number = 0;
  constructor() {
    super();
  }

  public setWorldSize(size: number) {
    this.worldSize = size;
  }

  public addSpriteToContainer(num: number) {
    for (let i = 0; i < num; i++) {
      const tree = new Sprite({
        texture: this.texture,
        x: Math.random() * this.worldSize,
        y: Math.random() * this.worldSize,
        anchor: 0.5,
        scale: 0.25,
      })

      this.container.addChild(tree)
    }

    //  绘制顺序调整 -> 按照 y 轴排序(上面是随机的可能会出现图层覆盖不对的问题)
    this.container.children.sort((a, b) => a.position.y - b.position.y);
    this.app.stage.addChild(this.container)
  }

  private async mouseMoveFn(e: MouseEvent) {
    this.mouseX = e.clientX || 0
    this.mouseY = e.clientY || 0
  }

  public addMouseListener() {
    this.app.canvas.addEventListener('mousemove', this.mouseMoveFn.bind(this))
  }

  public removeMouseListener() {
    this.app.canvas.removeEventListener('mousemove', this.mouseMoveFn.bind(this))
  }

  public renderTreeMap() {
    this.app.ticker.add(() => {
      const screenWidth = this.app.renderer.width
      const screenHeight = this.app.renderer.height

      const targetX = (this.mouseX / screenWidth) * (this.worldSize - screenWidth)
      const targetY = (this.mouseY / screenHeight) * (this.worldSize - 2*screenHeight)

      this.container.x += (-targetX - this.container.x) * 0.1
      this.container.y += (-targetY - this.container.y) * 0.1

    })
  }
}

const renderGroup = async (warp: HTMLElement) => {
  const group = new GroupDemo();

  await group.initCanavs(warp, { backgroundColor: 'brown'});
  await group.getTexture('https://pixijs.com/assets/tree.png')

  group.setContainer({ isRenderGroup: true })
  group.setWorldSize(5000)
  group.addSpriteToContainer(100000)
  group.addMouseListener()

  group.renderTreeMap()

  return {
    removeListener: group.removeMouseListener
  }
  
}

export default renderGroup