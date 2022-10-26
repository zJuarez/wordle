import { useState, useCallback, useEffect } from 'react';
import Box from './Box';
import Keyboard from '../keyboard/Keyboard';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WORDS_TA from '../words/wordle-Ta'
import WORDS_LA from '../words/wordle-La'
import useEventListener from '../keyboard/useEventListener';
import Confetti from 'react-confetti'
import useWindowSize from '../hoooks/useWindowSize'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: "150px",
        textAlign: "center",
        transform: 'translate(-50%, -50%)',
    },
};

const indx = (c) => c.charCodeAt(0) - 'a'.charCodeAt(0)
const repl = (str, i, r) => {
    return str.substring(0, i) +
        r +
        str.substring(i + 1);
}

const isLetter = str => str.length === 1 && str.match(/[a-z]/i);

const notEnoughLetters = () => toast("Not Enough Letters");
const notInWordList = () => toast("Not In Word List");

const defaultState = { word: "", letters: "", colors: "", used: Array(26).fill('f'), shake: false, win: 0 }

function Game(props) {

    const [modalIsOpen, setIsOpen] = useState(false)
    const [state, setState] = useState(defaultState)
    const size = useWindowSize()

    function closeModal() {
        setIsOpen(false);
    }
    function openModal() {
        setIsOpen(true)
    }

    const playAgain = useCallback(() => {
        props.setWord(WORDS_LA[Math.floor(Math.random() * WORDS_LA.length)])
        setState(defaultState)
        setIsOpen(false)
    }, [setState, setIsOpen, props.setWord]);

    const typeLetter = useCallback((letter) => {
        if (state.win > 0) {
            return;
        }
        if (state.word.length < props.length) {
            const nWord = state.word + letter
            const nLetters = state.letters + letter

            const newState = { ...state, word: nWord, letters: nLetters }
            setState(newState)

        }
    }, [state.word, props.length, state.win]);

    const remove = useCallback(() => {
        if (state.win > 0) {
            return;
        }
        if (state.word.length > 0) {
            const nWord = state.word.substring(0, state.word.length - 1)
            const nLetters = state.letters.substring(0, state.letters.length - 1)

            const newState = { ...state, word: nWord, letters: nLetters }
            setState(newState)
        }
    }, [state.word, state.win]);


    const enter = useCallback(() => {
        let win = 0
        if (state.win > 0) {
            openModal()
        }
        else if (state.word.length === props.length) {
            if (!WORDS_TA.includes(state.word) && !WORDS_LA.includes(state.word)) {
                notInWordList()
                setState({ ...state, shake: true })
            } else {
                let NewColors = state.colors + ('t').repeat(props.length)
                let abc = Array(26).fill(0)
                let abcOg = Array(26).fill(0)
                let newUsed = [...state.used]

                for (let i = 0; i < props.length; i++) {
                    abc[indx(state.word[i])]++
                    abcOg[indx(props.word[i])]++
                }

                for (let i = 0; i < props.length; i++) {
                    if (state.word[i] === props.word[i]) {
                        NewColors = repl(NewColors, state.colors.length + i, 'v')
                        newUsed[indx(state.word[i])] = 'v'
                        abcOg[indx(state.word[i])]--
                    }
                }

                for (let i = 0; i < props.length; i++) {
                    if (state.word[i] === props.word[i]) {
                        continue;
                    } else if (!props.word.includes(state.word[i])) {
                        NewColors = repl(NewColors, state.colors.length + i, 'g')
                        if (newUsed[indx(state.word[i])] == 'f')
                            newUsed[indx(state.word[i])] = 'g'
                    } else {
                        if (abcOg[indx(state.word[i])] > 0) {
                            NewColors = repl(NewColors, state.colors.length + i, 'a')
                            if (newUsed[indx(state.word[i])] == 'g' || newUsed[indx(state.word[i])] == 'f')
                                newUsed[indx(state.word[i])] = 'a'
                        }
                        else {
                            NewColors = repl(NewColors, state.colors.length + i, 'g')
                            if (newUsed[indx(state.word[i])] == 'f')
                                newUsed[indx(state.word[i])] = 'g'
                        }
                    }
                    abcOg[indx(state.word[i])]--
                }
                // last time
                if (state.colors.length >= (props.trys - 1) * props.length) {
                    if (state.word === props.word) {
                        openModal()
                        win = 2
                    } else {
                        win = 1
                        openModal()
                    }
                } else if (state.word === props.word) {
                    openModal()
                    win = 2
                }
                setState({ ...state, colors: NewColors, word: "", used: newUsed, win: win })
            }
        } else {
            notEnoughLetters()
            setState({ ...state, shake: true })
        }
    }, [state, props]);

    const listener = useCallback((event) => {
        if (isLetter(event.key)) {
            typeLetter(event.key)
        } else if (event.key == 'Backspace') {
            remove()
        } else if (event.key == 'Enter') {
            enter()
        }
    }, [enter, typeLetter, remove]);

    useEffect(() => {
        if (state.win === 2) {
            props.setWins(props.wins + 1)
        } else if (state.win === 1) {
            props.setWins(0)
        }
    }, [state.win])

    useEventListener('keydown', listener)

    return (
        <div className="Game">
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover
                theme="dark"
            />
            {Array.from({ length: props.trys }, (x, row) =>
                <div key={row} className="Row">
                    {Array.from({ length: props.length }, (x, col) =>
                        <Box key={col}
                            shake={state.shake && (state.colors.length <= (row * (props.length) + col) && (row * (props.length) + col) < state.colors.length + props.length)}
                            turnOffShake={() => setState({ ...state, shake: false })}
                            colorCode={row * (props.length) + col < state.colors.length ? state.colors[row * (props.length) + col] : "t"}
                            value={row * (props.length) + col < state.letters.length ? state.letters[row * (props.length) + col] : ""} />)}
                </div>)}
            <Keyboard enter={enter} used={state.used} remove={remove} typeLetter={typeLetter}></Keyboard>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel={props.word}
            >
                <h2> {state.win === 2 ? "WIN!" : "LOSE"}</h2>
                <p> Answer:</p>
                <h4> {props.word.toUpperCase()}</h4>
                <h5> {"WIN STREAK: " + props.wins}  </h5>
                <button onClick={playAgain}> Play again</button>

            </Modal>
            {state.win === 2 && <Confetti
                width={size.width}
                height={size.height}
            />}
        </div>

    );
}

export default Game;
