import React, { useLayoutEffect, useRef } from 'react';
import Snake from './snake';

const SnakeGame: React.FC = () => {
  const gameWarpRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    initCanavs();
  }, [])


  const initCanavs = async () => {
    new Snake({ warp: gameWarpRef.current })
  }
  
  return (
    <div>
      <h1>Snake Game</h1>
      <div ref={gameWarpRef}></div>
    </div>
  )
}


export default SnakeGame;

