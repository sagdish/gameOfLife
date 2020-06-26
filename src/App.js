import React from 'react';

import './App.css';
import Game from './components/Game';

function App() {
  return (
    <div className="App">
      <h1>Game</h1>
      <Game width={400} height={400}/>
    </div>
  );
}

export default App;
