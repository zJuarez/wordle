import logo from './logo.svg';
import './App.css';
import Game from './game/Game';
import WORDS from './words/wordle-La'

function App() {
  const trys = 6
  const length = 5
  const randomIndex = Math.floor(Math.random() * WORDS.length)
  console.log(randomIndex)
  console.log(WORDS[randomIndex])
  return (
    <div className="App">
      <h1> Wordle</h1>
      <Game word={WORDS[randomIndex]} trys={trys} length={length}></Game>
    </div>
  );
}

export default App;
