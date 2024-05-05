import React from 'react';
import './index.less';

export enum SkeletonType {
  ONELINE = 'oneline',
  MULTILINE = 'multiline'
}

interface ILoadingSkeleton {
  type?: keyof typeof SkeletonType;
  num?: number;
}


const LoadingSkeleton:React.FC<ILoadingSkeleton> = (props) => {
  const { type = SkeletonType.MULTILINE, num } = props;

  return (
    <div className='ske-list-warpper'>
      {new Array(num).fill({}).map((_, index) => (
        <div key={index} className='loading-grid-item'></div>
      ))}
    </div>
  )
}

export default LoadingSkeleton;