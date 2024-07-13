import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import useGameSetup from './demos/index.config';
import toRenderCanvas from './demos/classTest.config';
import renderMash from './demos/MashPlan';
import renderGroup from './demos/group';

import renderWheelsGame from './advanced/wheels';


const TreasureHunter: React.FC = () => {
  const [warp, setWarp] = useState(null);
  const gameRef = useRef<HTMLDivElement>(null);
  
  // useGameSetup(warp);

  useEffect(() => {
    // toRenderCanvas(gameRef.current);
    // renderMash(gameRef.current);
    // renderGroup(gameRef.current);
    renderWheelsGame(gameRef.current);
  }, [])

  return (
    // <div ref={(ref) => setWarp(ref)}>
    <div ref={gameRef}>
    </div>
  );
}

export default TreasureHunter;