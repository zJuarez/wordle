import logo from './logo.svg';
import './App.css';
import Game from './game/Game';
var randomWord = require('random-word-by-length');

function App() {
  const trys = 6
  const length = 5
  return (
    <div className="App">
      <h1> Wordle</h1>
      <Game word={randomWord(5)} trys={trys} length={length}></Game>
    </div>
  );
}

export default App;
