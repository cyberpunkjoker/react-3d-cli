import {
  FillGradient, 
  Text, 
  BlurFilter, 
  Container, 
  Graphics, 
  Sprite, 
  TextStyle, 
  Texture, 
  Color
} from "pixi.js"

import BaseInitPixi from "../base"

interface ReelsItem {
  container: Container
  symbols: Sprite[]
  position: number
  previousPosition: number
  blur: BlurFilter
}

class Wheels extends BaseInitPixi {
  REEL_WIDTH: number = 160
  SYMBOL_SIZE: number = 150
  assetsList: Texture[] = []
  margin: number = 0
  /** 动画数据 */
  reels: ReelsItem[] = []
  running: boolean = false

  constructor() {
    super()
  }

  private getRowItem(rc: Container) {
    return {
      container: rc,
      symbols: [],
      position: 0,
      previousPosition: 0,
      blur: new BlurFilter()
    }
  }

  private getRandomAsset() {
    return this.assetsList[Math.floor(Math.random() * this.assetsList.length)]
  }

  private setMarginNum(col: number) {
    const margin = (this.app.screen.height - this.SYMBOL_SIZE * col) / 2;
  
    this.margin = margin
    this.container.y = margin
    this.container.x = 0
  }

  private getFillColor() {
    const fill = new FillGradient(0, 0, 0, 36 * 1.7);
    const colors = [0xffffff, 0x00ff99].map((color) => Color.shared.setValue(color).toNumber());

    colors.forEach((number, index) => {
      const ratio = index / (colors.length);
      fill.addColorStop(ratio, number);
    })

    return fill
  }

  private setTextStyle() {
    const fill = this.getFillColor()

    const style = new TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      fontStyle: 'italic',
      fontWeight: 'bold',
      fill: { fill },
      stroke: { color: 0x4a1850, width: 5 },
      dropShadow: {
        color: 0x000000,
        angle: Math.PI / 6,
        blur: 4,
        distance: 6,
      },
      wordWrap: true,
      wordWrapWidth: 440,
    })

    return style
  }

  private listenBottomClick(bottom: Graphics) {
    bottom.eventMode = 'static';
    bottom.cursor = 'pointer';
    bottom.addListener('pointerdown', this.startPlay)
  }

  setAssets(assets: Texture[]) {
    this.assetsList = assets
  }

  renderRow(rowCount: number, colCount: number) {
    const { SYMBOL_SIZE, REEL_WIDTH } = this

    for (let i = 0; i < rowCount; i++) {
      const row = new Container()
      row.x = i * REEL_WIDTH
      this.container.addChild(row)

      const reel = this.getRowItem(row)

      reel.blur.blurX = 0
      reel.blur.blurY = 0
      row.filters = [reel.blur]

      for (let j = 0; j < colCount; j++) {
        const symbol = new Sprite(this.getRandomAsset())
        
        symbol.y = j * SYMBOL_SIZE;
        symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height);
        symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 2);
        reel.symbols.push(symbol);
        row.addChild(symbol);
      }

      this.reels.push(reel)
    }

    this.setMarginNum(colCount)

    this.app.stage.addChild(this.container);
  }

  buildTopContent() {
    const top = new Graphics()
      .rect(0, 0, this.app.screen.width, this.margin)
      .fill({ color: 0x0 })

    const headerText = new Text('PIXI MONSTER SLOTS!', this.setTextStyle())
    
    headerText.x = Math.round((top.width - headerText.width) / 2);
    headerText.y = Math.round((this.margin - headerText.height) / 2);

    top.addChild(headerText);
    this.app.stage.addChild(top);
  }

  buildBottomContent() {
    const bottom = new Graphics()
      .rect(0, this.SYMBOL_SIZE * 3 + this.margin, this.app.screen.width, this.margin)
      .fill({ color: 0x0 });

    const playText = new Text('Spin the wheels!', this.setTextStyle());

    playText.x = Math.round((bottom.width - playText.width) / 2);
    playText.y = this.app.screen.height - this.margin + Math.round((this.margin - playText.height) / 2);

    bottom.addChild(playText);

    this.listenBottomClick(bottom)
    this.app.stage.addChild(bottom);
  }

  startPlay() {
    if (this.running) return
    this.running = true

    for (let i = 0; i < this.reels.length; i++) {
      const reel = this.reels[i]


    }
  }

  ani() {
    this.app.ticker.add(() =>
      {
          // Update the slots.
          for (let i = 0; i < this.reels.length; i++)
          {
              const r = this.reels[i];
              // Update blur filter y amount based on speed.
              // This would be better if calculated with time in mind also. Now blur depends on frame rate.
  
              r.blur.blurY = (r.position - r.previousPosition) * 8;
              r.previousPosition = r.position;
  
              // Update symbol positions on reel.
              // for (let j = 0; j < r.symbols.length; j++)
              // {
              //     const s = r.symbols[j];
              //     const prevy = s.y;
  
              //     s.y = ((r.position + j) % r.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE;
              //     if (s.y < 0 && prevy > SYMBOL_SIZE)
              //     {
              //         // Detect going over and swap a texture.
              //         // This should in proper product be determined from some logical reel.
              //         s.texture = slotTextures[Math.floor(Math.random() * slotTextures.length)];
              //         s.scale.x = s.scale.y = Math.min(SYMBOL_SIZE / s.texture.width, SYMBOL_SIZE / s.texture.height);
              //         s.x = Math.round((SYMBOL_SIZE - s.width) / 2);
              //     }
              // }
          }
      });
  }

}


const assets = [
  "https://pixijs.com/assets/eggHead.png",
  "https://pixijs.com/assets/flowerTop.png",
  "https://pixijs.com/assets/helmlok.png",
  "https://pixijs.com/assets/skully.png",
]

const renderWheelsGame = async (warp: HTMLElement) => {
  const wheel = new Wheels()

  // 获取资源
  await wheel.getAssets(assets, 3)
  const slotTextures = assets.map((url) => Texture.from(url))

  // 初始化画布
  await wheel.initCanavs(warp, { background: "#1099bb" })

  // 设置主体绘画区域
  wheel.setContainer()

  wheel.setAssets(slotTextures)

  // 绘制转盘区
  wheel.renderRow(4, 3)
  // 绘制顶部文字
  wheel.buildTopContent()
  // 绘制底部文字
  wheel.buildBottomContent()

} 

export default renderWheelsGame