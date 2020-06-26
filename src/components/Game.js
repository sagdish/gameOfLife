import React, { useRef, useState, useEffect } from 'react';
import moment from 'moment';

import useAnimation from './useAnimation';

function Game(props) {
  const canvasRef = useRef(null);
  const [ stopAnimation, setStopAnimation ] = useState(false);

  const doAnimation = elapsedTime => {
    console.log('elapsed time: ', elapsedTime);
    console.log(canvasRef.current);
  };

  const [ cancelAnimationFrame ] = useAnimation(moment.now(), doAnimation);

  const stopCanvas = () => {
    cancelAnimationFrame();
  }

  const canvas = canvasRef.current;
  // const context = canvas.getContext('2d');


  return (
    <div>
      <button onClick={stopCanvas}>Stop</button>
      <canvas ref={canvasRef} width={props.width} height={props.height} />
    </div>
  );
}

export default Game;