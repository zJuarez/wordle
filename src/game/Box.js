function Box(props) {
    const colorCode = props.colorCode
    let color = "transparent"
    if (colorCode === 'v') {
        color = "green"
    } else if (colorCode === 'a') {
        color = "yellow"
    } else if (colorCode === 'g') {
        color = "lightgray"
    }

    return (
        <div className="Box" style={{ backgroundColor: color }}>
            {props.value ? props.value.toUpperCase() : ""}
        </div>
    );
}

export default Box;
