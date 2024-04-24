import React, { useEffect, useRef } from 'react';

const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snakeRef = useRef<number[]>([]);
  const pointsRef = useRef<number[]>([]);

  useEffect(() => {
    initCanavs();
  }, [])


  const randomPosition = () => {
    const x = Math.floor(Math.random() * 400);
    const y = Math.floor(Math.random() * 400);
    return {x, y};
  }

  const pushToPoints = ({x, y}: {x: number, y: number}) => {
    pointsRef.current.push(x, y);
  }

  const drawAball = () => {
   

  }

  const initCanavs = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    [canvas.width, canvas.height] = [400, 400];

    ctx.fillStyle = 'red';
  }
  
  return (
    <div>
      <h1>Snake Game</h1>
      <canvas></canvas>
    </div>
  )
}


export default SnakeGame;

