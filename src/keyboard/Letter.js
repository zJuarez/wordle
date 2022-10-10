import { getColor } from '../game/colors';

function Letter(props) {
    return (
        <button style={{ backgroundColor: getColor(props.used) }} className="Letter" onClick={() => props.typeLetter(props.value)}>
            {props.value.toUpperCase()}
        </button>
    );
}

export default Letter;
