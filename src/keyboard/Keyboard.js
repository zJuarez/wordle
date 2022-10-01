import Letter from "./Letter";

function Keyboard(props) {

    const FirstRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
    const SecondRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
    const ThirdRow = ['z', 'x', 'c', 'v', 'b', 'n', 'm']
    const indx = (c) => c.charCodeAt(0) - 'a'.charCodeAt(0)

    return (
        <div className="Keyboard">
            <div className="RowK">
                {FirstRow.map(letter => <Letter used={props.used[indx(letter)]} typeLetter={props.typeLetter} value={letter}> </Letter>)}
            </div>
            <div className="RowK">
                {SecondRow.map(letter => <Letter used={props.used[indx(letter)]} typeLetter={props.typeLetter} value={letter}> </Letter>)}
            </div>
            <div className="RowK">
                <button className="Button" onClick={props.enter}>
                    ENTER
                </button>
                {ThirdRow.map(letter => <Letter used={props.used[indx(letter)]} typeLetter={props.typeLetter} value={letter}> </Letter>)}
                <button className="Button" onClick={props.remove}>
                    ←
                </button>
            </div>
        </div>
    );
}

export default Keyboard;
