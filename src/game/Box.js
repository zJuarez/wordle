import { getColor } from './colors';
import { useState, useEffect } from 'react';

function Box(props) {
    const [type, setType] = useState(" ");
    const colorCode = props.colorCode
    const color = getColor(colorCode)
    const empty = color === "transparent"
    const flip = !empty ? " flip" : ""
    const letter = props.value ? props.value.toUpperCase() : ""
    const error = props.shake ? " error" : "";
    useEffect(() => {
        if (props.value === "") {
            setType(" ");
        } else {
            setType(" type")
        }
    }, [props.value]);
    return (
        <div className={"Box " + flip}>
            <div className={'flipper'}>
                <div className={'front' + type}></div>
                <div style={{ borderColor: letter !== "" ? 'gray' : '' }} className={'front' + error} onAnimationEnd={props.turnOffShake}> {letter}</div>
                <div className='back' style={{
                    backgroundColor: color,
                    borderColor: color,
                }}> {letter}</div>

            </div>

        </div>
    );
}

export default Box;
