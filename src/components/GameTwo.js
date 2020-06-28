import React, { useRef, useState, useEffect } from 'react';
import moment from 'moment';

import {useAnimeFrame} from './useAnimation';

function Game(props) {
  const [startGame, setStartGame] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [playing, setPlaying] = useState(false)

  const canvasRef = useRef(null);

  const resolution = 20;
  const colums = props.width / resolution
  const rows = props.height / resolution
  
  // initial function to build twodimmensional array:
  const buildGrid = () => {
    const twoDimArr = new Array(colums).fill(null).map(
      () => new Array(rows).fill(null)
    );
    
    for (let i = 0; i < twoDimArr.length; i++) {
      for (let j = 0; j < twoDimArr[i].length; j++) {
        twoDimArr[i][j] = Math.floor(Math.random() * 2);
      }
    }
    return twoDimArr;
  }

  const drawGrid = (grid, context) => {
    for (let col = 0; col < grid.length; col++) {
      for (let row = 0; row < grid[col].length; row++) {
        const cell = grid[col][row];
        context.beginPath();
        context.rect(col * resolution, row * resolution, resolution, resolution);
        context.fillStyle = cell === 1 ? 'gray' : 'white';
        context.fill();
        context.stroke();
      }
    }
  }

  let refAnim = useRef(null)
  let timerRef = useRef(null)

  useEffect(()=> {
    let grid = buildGrid();
  }, [refresh])
  
  useEffect(() => {
    let grid = buildGrid();

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    requestAnimationFrame(update)
    function update(args) {
      // console.log(args)
      grid = nextGen(grid);
      drawGrid(grid, context);
      if (startGame) {
        timerRef.current = setTimeout(function(){
          refAnim.current = requestAnimationFrame(update)
          console.log(refAnim.current)
        }, 100)
      }
    }

  })

  function cancelAnimation() {
    // cancelAnimationFrame(refAnim.current)
    clearTimeout(timerRef.current)
    console.log('inside of cancelAnimation', refAnim)
    console.log('reached')
    setStartGame(false)
  }

  // used
  const nextGen = (grid) => {
    const nextGrid = grid.map(arr => [...arr])

    for (let col = 0; col < grid.length; col++) {
      for (let row = 0; row < grid[col].length; row++) {

        const cell = grid[col][row];
        let sumNeighbor = 0;
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
            if (i === 0 && j === 0) {
              continue;
            }

            const x_cell = col + i;
            const y_cell = row + j;
            if (x_cell >= 0 && y_cell >= 0 && x_cell < colums && y_cell < rows) {
              const currNeighbor = grid[col + i][row + j];
              sumNeighbor += currNeighbor;
            }

          }
        }

        // rules: 
        if (cell === 1 && sumNeighbor < 2) {
          nextGrid[col][row] = 0;
        } else if (cell === 1 && sumNeighbor > 3) {
          nextGrid[col][row] = 0;
        } else if (cell === 0 && sumNeighbor === 3) {
          nextGrid[col][row] = 1;
        } 
      }
    }

    return nextGrid;
  }

  console.log(startGame)

  return (
    <div className='container'>
      <div className='buttons'>
        <button disabled={startGame ? true : false} 
          onClick={() =>setStartGame(true)}
        > Start
        </button>
        
        <button 
          disabled={startGame ? false : true}
          onClick={() => { 
          cancelAnimation()
          } }>Stop
          </button>
          
        <button
          disabled={startGame ? true : false} 
          onClick={() => {
            setRefresh(!refresh)
            setStartGame(false)
            setPlaying(false)
            }}
        >Randomize Live Cells
        </button>
      </div>
      <canvas ref={canvasRef} width={props.width} height={props.height} />
    </div>
  );
}

export default Game;