import React, { useEffect, useState } from "react";

// custom hook for using animation frame
export const useAnimeFrame = ( timestamp, doAnimationCallBack ) => {
  
  // set the prev time stamp
  const [ prevTimeStamp, setTimeStamp ] = useState( timestamp - 30 );
  const [ continueAnimation, setContinueAnimation ] = useState( true );
  const [ started, setStarted ] = useState( false );
  
  useEffect( () => {
    
    // only start the animation frame if we haven't in the past
    if( !started ){
      setStarted( true );
      requestAnimationFrame( onFrame );
    }
  }, [ started ] );
  
  // Request the first animation frame to kick things off
  const onFrame = ( timestamp ) => {
    
    // if we want to do more ask for the next frame
    if( continueAnimation ){
      requestAnimationFrame( onFrame );
      console.log('here\n its still running')
    }
    const elapsed = prevTimeStamp - timestamp;
    setTimeStamp( timestamp );
    console.log( `Current time: ${ timestamp } ms, frame time: ${ elapsed } ms` );
    
    //call callback and pass it the elapsed time
    doAnimationCallBack( elapsed );
    
  };
  
  // this wills stop the hook from calling the next animation frame
  const cancelAnimation = () => {
    setContinueAnimation( false );
  };
  
  return [ cancelAnimation ];
  
};




// import React, { useEffect, useState } from 'react';

// const useAnimation = (timestamp, doAnimationCallBack) => {
//   const [ prevTimeStamp, setTimeStamp] = useState(timestamp - 30);
//   const [ continueAnimation, setContinueAnimation ] = useState(true);
//   const [ started, setStarted ] = useState(false);

//   useEffect(() => {
//     if(!started) {
//       setStarted(true);
//       requestAnimationFrame(onFrame);
//     }
//   }, [started]);

//   const onFrame = ( timestamp ) => {
//     if (continueAnimation) {
//       requestAnimationFrame(onFrame)
//       console.log(`current time: ${timestamp} ms`);
//     }
//     const elapsed = prevTimeStamp - timestamp;
//     setTimeStamp(timestamp);
//     console.log(`current time: ${timestamp} ms, frame time : ${elapsed} ms`);

//     doAnimationCallBack(elapsed);
//   };

//   const cancelAnimation = () => {
//     setContinueAnimation(false);
//   }

//   return [cancelAnimation]
// };

// export default useAnimation;