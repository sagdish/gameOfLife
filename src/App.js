import React from 'react';

import './App.css';
import Game from './components/Game';
import GameTwo from './components/GameTwo';


function App() {
  return (
    <div className="App">
      <h1>Game</h1>
      {/* <Game width={400} height={400}/> */}
      <GameTwo width={800} height={800}/>
    </div>
  );
}

export default App;
