import React, { useRef, useState, useEffect } from 'react';
import moment from 'moment';

import useAnimation from './useAnimation';

function Game(props) {
  const canvasRef = useRef(null);
  const [ stopAnimation, setStopAnimation ] = useState(false);

  const resolution = 40;
  const buildGrid = () => {
    const twoDimArr = new Array(props.width / resolution).fill(null).map(
      () => new Array(props.height / resolution).fill(null)
    );
    
    for (let i = 0; i < twoDimArr.length; i++) {
      for (let j = 0; j < twoDimArr[i].length; j++) {
        twoDimArr[i][j] = Math.floor(Math.random() * 2);
      }
    }
    return twoDimArr;
  }

  const grid = buildGrid();
  console.log(grid);

  const drawGage = (grid, context) => {
    for (let col = 0; col < grid.length; col++) {
      for (let row = 0; row < grid[col].length; row++) {
        const cell = grid[col][row];
        context.beginPath();
        context.rect(col * resolution, row * resolution, resolution, resolution);
        context.stroke();
        
      }
    }
  } 

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    drawGage(grid, context)
    
  })
  
  
  
  const doAnimation = elapsedTime => {
    console.log('elapsed time: ', elapsedTime);
    console.log(canvasRef.current);
  };

  // const [ cancelAnimationFrame ] = useAnimation(moment.now(), doAnimation);

  const stopCanvas = () => {
    cancelAnimationFrame();
  }

  return (
    <div>
      <button onClick={stopCanvas}>Stop</button>
      <canvas ref={canvasRef} width={props.width} height={props.height} />
    </div>
  );
}

export default Game;