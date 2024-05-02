import React, { useEffect, useRef } from'react';
import './index.less';

const AnimationBg: React.FC = () => {

  const bgWrapperRef = useRef<HTMLDivElement>(null);

  const offsetXRef = useRef<number>(0);
  const isAnimatingRef = useRef<boolean>(false)
  const moverPerTimes = 10;
  const moveTimes = 20


  useEffect(() => {
    // TODO: 加个限流
    const handleResize = () => {
      if (!bgWrapperRef.current) return

      const moveWidth = bgWrapperRef.current.clientWidth / 2
      if (offsetXRef.current < 0) {
        offsetXRef.current = -moveWidth
      } else {
        offsetXRef.current = 0
      }
      bgWrapperRef.current.style.transform = `translateX(${offsetXRef.current}px)`;
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const toMove = (moveWidth, type = 'left') => {
    switch (type) {
      case 'left':
        if (offsetXRef.current <= -moveWidth) {
          isAnimatingRef.current = false
          return
        }
        offsetXRef.current -= moverPerTimes
        break;

      case 'right':
        if (offsetXRef.current >= 0) {
          isAnimatingRef.current = false
          return
        }
        offsetXRef.current += moverPerTimes
        break;

      default:
        break;
    }

    bgWrapperRef.current.style.transform = `translateX(${offsetXRef.current}px)`;

    setTimeout(() => {
      toMove(moveWidth, type)
    }, moveTimes)
  }

  const handleL2R = () => {
    if (isAnimatingRef.current) return

    const moveWidth = bgWrapperRef.current.clientWidth / 2
    isAnimatingRef.current = true

    toMove(moveWidth, 'right')
  }

  const handleR2L = () => {
    if (isAnimatingRef.current) return

    const moveWidth = bgWrapperRef.current.clientWidth / 2
    isAnimatingRef.current = true

    toMove(moveWidth, 'left')
  }

  return (
    <div className='animation-wrapper'>
      <div className='animation-bg'>
        <div ref={bgWrapperRef} className='animation-all'>
          <div className='bg-left'></div>
          <div className='bg-right'></div>
        </div>
      </div>

      <div onClick={handleR2L}>aaaa</div>
      <div onClick={handleL2R}>bbbb</div>
    </div>
  )
}

export default AnimationBg;