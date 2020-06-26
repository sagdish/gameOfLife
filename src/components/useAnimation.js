import React, { useEffect, useState } from 'react';

const useAnimation = (timestamp, doAnimationCallBack) => {
  const [ prevTimeStamp, setTimeStamp] = useState( timestamp - 30 );
  const [ continueAnimation, setContinueAnimation ] = useState( true );
  const [ started, setStarted ] = useState( false );

  useEffect( () => {
    if(!started) {
      setStarted(true);
      requestAnimationFrame(onFrame);
    }
  }, [ started ]);

  const onFrame = ( timestamp ) => {
    if (continueAnimation) {
      requestAnimationFrame(onFrame)
    }
    const elapsed = prevTimeStamp - timestamp;
    setTimeStamp(timestamp);
    console.log(`current time: ${timestamp} ms, frame time : ${elapsed} ms`);

    doAnimationCallBack(elapsed);
  };

  const cancelAnimation = () => {
    setContinueAnimation(false);
  }

  return [cancelAnimation]
};

export default useAnimation;