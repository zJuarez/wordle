import { useState, useEffect } from 'react';
import Box from './Box';
import Keyboard from '../keyboard/Keyboard';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

function Game(props) {
    const Trys = props.trys
    const Length = props.length
    const WordGoal = props.word

    var checkWord = require('check-if-word')
    var words = checkWord('en'); // setup the language for check, default is en

    const notEnoughLetters = () => toast("Not Enough Letters");
    const notInWordList = () => toast("Not In Word List");

    const [key, setKey] = useState({ c: 0, k: "" })
    const [modalIsOpen, setIsOpen] = useState(false);
    const [state, setState] = useState({ word: "", letters: "", colors: "", used: Array(26).fill(false) })
    const [win, setIsWin] = useState(0) // 0 valid, 1 invalid

    function closeModal() {
        setIsOpen(false);
    }
    function openModal() {
        setIsOpen(true)
    }

    const typeLetter = (letter) => {
        if (state.word.length < Length) {
            const nWord = state.word + letter
            const nLetters = state.letters + letter

            const newState = { ...state, word: nWord, letters: nLetters }
            setState(newState)

        }
    }

    const remove = () => {
        if (state.word.length > 0) {
            const nWord = state.word.substring(0, state.word.length - 1)
            const nLetters = state.letters.substring(0, state.letters.length - 1)

            const newState = { ...state, word: nWord, letters: nLetters }
            setState(newState)
        }
    }

    const indx = (c) => c.charCodeAt(0) - 'a'.charCodeAt(0)
    const repl = (str, i, r) => {
        return str.substring(0, i) +
            r +
            str.substring(i + 1);
    }

    const enter = () => {
        if (state.colors.length === Trys * Length) {
            if (state.word === WordGoal) {
                openModal()
            } else {
                openModal()
            }
        }
        else if (state.word.length === Length) {
            if (!words.check(state.word)) {
                notInWordList()
            } else {
                let NewColors = state.colors + ('t').repeat(Length)
                let abc = Array(26).fill(0)
                let abcOg = Array(26).fill(0)
                let newUsed = [...state.used]

                for (let i = 0; i < Length; i++) {
                    abc[indx(state.word[i])]++
                    abcOg[indx(WordGoal[i])]++
                    newUsed[indx(state.word[i])] = 1
                }

                for (let i = 0; i < Length; i++) {
                    if (state.word[i] === WordGoal[i]) {
                        NewColors = repl(NewColors, state.colors.length + i, 'v')
                        abcOg[indx(state.word[i])]--
                    }
                }

                for (let i = 0; i < Length; i++) {
                    if (state.word[i] === WordGoal[i]) {
                        continue;
                    } else if (!WordGoal.includes(state.word[i])) {
                        NewColors = repl(NewColors, state.colors.length + i, 'g')
                    } else {
                        if (abcOg[indx(state.word[i])] > 0)
                            NewColors = repl(NewColors, state.colors.length + i, 'a')
                        else
                            NewColors = repl(NewColors, state.colors.length + i, 'g')
                    }
                    abcOg[indx(state.word[i])]--
                }
                if (state.word === WordGoal) {
                    openModal()
                    setIsWin(true)
                }
                setState({ ...state, colors: NewColors, word: "", used: newUsed })
            }
        } else {
            notEnoughLetters()
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

    const ModalTitle = win ? "WIN!" : "LOSE"

    return (
        <div className="Game" onKeyPress>
            <ToastContainer />
            {Array.from({ length: Trys }, (x, row) =>
                <div key={row} className="Row">
                    {Array.from({ length: Length }, (x, col) =>
                        <Box key={col} colorCode={row * (Length) + col < state.colors.length ? state.colors[row * (Length) + col] : "t"}
                            value={row * (Length) + col < state.letters.length ? state.letters[row * (Length) + col] : " "} />)}
                </div>)}
            <Keyboard enter={enter} used={state.used} remove={remove} typeLetter={typeLetter}></Keyboard>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel={WordGoal}
            >
                <h2> {ModalTitle}</h2>
                <h4> {WordGoal}</h4>
            </Modal>
        </div>

    );
}

export default Game;
