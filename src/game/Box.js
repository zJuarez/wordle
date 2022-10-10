import { getColor } from './colors';

function Box(props) {
    const colorCode = props.colorCode

    return (
        <div className="Box" style={{ backgroundColor: getColor(colorCode) }}>
            {props.value ? props.value.toUpperCase() : ""}
        </div>
    );
}

export default Box;
