function Box(props) {
    return (
        <div className="Box">
            {props.value ? props.value.toUpperCase() : ""}
        </div>
    );
}

export default Box;
