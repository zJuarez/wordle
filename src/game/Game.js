import { useState, useEffect } from 'react';
import Box from './Box';
import Keyboard from '../keyboard/Keyboard';

function Game(props) {
    const Trys = props.trys ?? 6
    const Length = props.length ?? 5

    const [key, setKey] = useState({ c: 0, k: "" })
    const [state, setState] = useState({ word: "", letters: "" })

    const typeLetter = (letter) => {
        if (state.word.length < Length) {
            const nWord = state.word + letter
            const nLetters = state.letters + letter

            const newState = { word: nWord, letters: nLetters }
            console.log(newState)
            setState(newState)

        }
    }

    const remove = () => {
        console.log("remv fun")
        if (state.word.length > 0) {
            const nWord = state.word.substring(0, state.word.length - 1)
            const nLetters = state.letters.substring(0, state.letters.length - 1)

            const newState = { word: nWord, letters: nLetters }
            console.log(newState)
            setState(newState)
        }
    }

    const enter = () => {
        console.log("enter fun")
        if (state.word.length === Length) {
            setState({ ...state, word: "" })
        }
    }

    const isLetter = str => str.length === 1 && str.match(/[a-z]/i);


    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            setKey({ k: event.key, c: key.c + 1 })
        })

    }, [])

    useEffect(() => {
        if (isLetter(key.k)) {
            typeLetter(key.k)
        } else if (key.k == 'Backspace') {
            remove()
        } else if (key.k == 'Enter') {
            enter()
        }

    }, [key])



    return (
        <div className="Game" onKeyPress>
            {Array.from({ length: Trys }, (x, row) =>
                <div key={row} className="Row">
                    {Array.from({ length: Length }, (x, col) =>
                        <Box key={col} value={row * (Length) + col < state.letters.length ? state.letters[row * (Length) + col] : " "} />)}
                </div>)}
            <Keyboard enter={enter} remove={remove} typeLetter={typeLetter}></Keyboard>
        </div>

    );
}

export default Game;
