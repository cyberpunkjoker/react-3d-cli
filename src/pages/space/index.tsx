import React, { useEffect } from 'react';
import ScrollWarpper from './components/ScrollWarpper';

const Space: React.FC = () => {

  useEffect(() => {
    return () => {
      console.log('Space unmount')
    }
  }, [])

  return (
    <ScrollWarpper></ScrollWarpper>
  )
}

export default Space;