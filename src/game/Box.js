import { getColor } from './colors';

function Box(props) {
    const colorCode = props.colorCode
    const color = getColor(colorCode)
    const empty = color === "transparent"
    return (
        <div className="Box" style={{
            backgroundColor: getColor(colorCode),
            borderColor: empty ? "rgb(211,214,218)" : color,
            color: empty ? "black" : "white"
        }}>
            {props.value ? props.value.toUpperCase() : ""}
        </div>
    );
}

export default Box;
