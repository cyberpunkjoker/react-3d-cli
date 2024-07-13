import { Application, Assets, Container, Rectangle, Sprite, Texture } from 'pixi.js';
import { AssetsListItem, ExtraAttribute } from './index.type';
import { useEffect, useState, useLayoutEffect } from 'react';
import { batchQuery } from '@/utils';
import Cat from "@/assets/gameTexture/hunter/cat.png"

type SpriteExtra = Sprite & ExtraAttribute

const canvasWidth = 800
const canvasHeight = 600


const useGameSetup = (warp: HTMLElement) => {

  useEffect(() => {
    if (!warp) return
    // setUp()
    renderAlien()
  }, [warp])

  const setUp = async () => {
    const app = new Application()
    
    await app.init({ 
      background: '#1099bb',
      // resizeTo: window,
      width: 1200,
      height: 800,
    })

    warp.appendChild(app.canvas);

    const container = new Container()

    app.stage.addChild(container)

    const texture = await Assets.load("https://pixijs.com/assets/bunny.png")

    for (let i = 0; i < 25; i++) {
      const bunny = new Sprite(texture)

      bunny.x = (i % 5) * 40
      bunny.y = Math.floor(i / 5) * 40

      console.log(bunny.x, bunny.y);
      
      container.addChild(bunny)

      bunny.anchor.set(0.5)

      app.ticker.add((time) => {
        bunny.rotation += 0.1
      })
    }

    container.x = app.screen.width / 2
    container.y = app.screen.height / 2


    container.pivot.x = container.width / 2
    container.pivot.y = container.height / 2


    app.ticker.add((time) =>
      {
          container.rotation -= 0.01 * time.deltaTime;
      })
  }

  const renderAlien = async() => {
    const app = await initCanvas(warp)

    warp.appendChild(app.canvas)

    const texture = await getTexture('https://pixijs.com/assets/eggHead.png')

    let aliens: SpriteExtra[] = []

    for (let i = 0; i < 25; i++) {
      const dude = setTextureToSprite(texture, app)
      aliens.push(dude)
      app.stage.addChild(dude)
    }

    const dudeBounds = createBounds(app)

    app.ticker.add(() =>
      {
          // Iterate through the dudes and update their position
          for (let i = 0; i < aliens.length; i++)
          {
              const dude = aliens[i];
              aAlienMove(dude, dudeBounds)
          }
      }
    );
    
  }
}


const initCanvas = async (warp: HTMLElement) => {
  const app = new Application()

  await app.init({
    // backgroundAlpha: 0,
    width: 1200,
    height: 800,
  })

  warp.appendChild(app.canvas)

  return app
}

const getTexture = async (url: string) => {
  const texture = await Assets.load(url)

  return texture
}

const setTextureToSprite = (texture: Texture, app: Application) => {
  const dude: SpriteExtra = new Sprite(texture)
  dude.anchor.set(0.5)
  dude.scale.set(0.8 + Math.random() * 0.3)

  dude.x = Math.random() * app.screen.width
  dude.y = Math.random() * app.screen.height
  dude.tint = Math.random() * 0xffffff

  // 自定义属性
  dude.direction = Math.random() * 2 * Math.PI
  dude.turningSpeed = Math.random() - 0.8;
  dude.speed = 2 + Math.random() * 2;

  return dude
}

const createBounds = (app: Application, dudePadiing: number = 100) => {
  const bounds = new Rectangle(
    -dudePadiing,
    -dudePadiing,
    app.screen.width + dudePadiing * 2,
    app.screen.height + dudePadiing * 2,
  )

  return bounds
}

const aAlienMove = (dude: SpriteExtra, dudeBounds: Rectangle) => {
   dude.direction += dude.turningSpeed * 0.01;
   dude.x += Math.sin(dude.direction) * dude.speed;
   dude.y += Math.cos(dude.direction) * dude.speed;
   dude.rotation = -dude.direction - Math.PI / 2;


  // 边界计算
  if (dude.x < dudeBounds.x) 
  {
    dude.x += dudeBounds.width;
  } 
  else if (dude.x > dudeBounds.x + dudeBounds.width) 
  {
    dude.x -= dudeBounds.width;
  }

  if (dude.y < dudeBounds.y) 
  {
    dude.y += dudeBounds.height;
  }
  else if (dude.y > dudeBounds.y + dudeBounds.height) 
  {
    dude.y -= dudeBounds.height;
  }
}

export default useGameSetup