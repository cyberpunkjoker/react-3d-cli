import React, { useState, useEffect, useRef } from'react';
import './index.less';

interface VideoLoadingProps {
  videoUrl: string;
}

const VideoLoading: React.FC<VideoLoadingProps> = (props) => {
  const { videoUrl } = props

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const retryPlay = () => {
    videoRef.current.src = videoUrl;
  }

  return (
    <div className="video-loading">
      <video
        ref={videoRef}
        src={videoUrl} 
        controls 
        preload='auto'
        onCanPlay={() => setIsLoading(false)}
        onError={() =>{
          setIsLoading(false)
          setIsError(true)
        }}
      ></video>

      { isLoading && <div className="loading">Video Loading...</div> }
      { isError && <div onClick={retryPlay} className="error">Video Error</div> }
    </div>
  );
};

export default VideoLoading;