import React, { useRef, useState } from 'react';
import './index.less';

interface ImgLoadingProps {
  retrytimes?: number;
  imgUrl: string;
}

const ImgLoading: React.FC<ImgLoadingProps> = (props) => {
  const { imgUrl, retrytimes = 3 } = props

  const [loading, setLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [imgKey, setImgKey] = useState("")

  const fetchTimes = useRef(0)

  const onLoad = () => {
    setLoading(false)
    setIsError(false)
  }

  const onError = () => {
    if (fetchTimes.current >= retrytimes) {
      setIsError(true)
      setLoading(false)
      return
    }
    setImgKey(String(fetchTimes.current))

    fetchTimes.current += 1
  }

  return (
    <div className="img-loading">
      <img
        key={imgKey}
        src={imgUrl}
        onLoad={onLoad}
        onError={onError} 
        alt="" 
      />
      {loading && <div className="loading"></div>}
      {isError && <div className="error">Error</div>}
    </div>
  );
};

export default ImgLoading; 