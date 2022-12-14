import './App.css';
import Game from './game/Game';
import WORDS from './words/wordle-La'
import { useState, useEffect } from 'react';

function App() {
  const trys = 6
  const length = 5

  const [word, setWord] = useState(WORDS[Math.floor(Math.random() * WORDS.length)]);
  const [wins, setWins] = useState(0);

  return (
    <div className="App">
      <h1> Wordle</h1>
      <Game wins={wins} setWins={setWins} word={word} trys={trys} length={length} setWord={setWord}></Game>
    </div >
  );
}

export default App;
