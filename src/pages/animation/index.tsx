import React from 'react';
import AnimationBg from './animationBg';
import ImgLoading from "@/components/ImgLoading";
import VideoLoading from '@/components/VideoLoading';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import './index.less';

const AnimationPage: React.FC = () => {
  return (
    <div className='animation-container'>
     
      <LoadingSkeleton num={10}/>
      <VideoLoading videoUrl='https://www.w3schools.com/html/mov_bbb.mp4'/>
      <AnimationBg />
      <ImgLoading 
        imgUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdrTGdthq04JJYsamnurvOCAH4RBIW66b57YZ54EPvj96Jkas41kD1gK7Tfw&s'
      />
     </div>
  );
};  

export default AnimationPage;