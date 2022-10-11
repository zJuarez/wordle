import { getColor } from '../game/colors';

function Letter(props) {
    const empty = props.used === "f"
    return (
        <button style={{
            backgroundColor: getColor(props.used),
            color: empty ? "black" : "white"
        }}
            className="Letter"
            onClick={() => props.typeLetter(props.value)}>
            {props.value.toUpperCase()}
        </button>
    );
}

export default Letter;
