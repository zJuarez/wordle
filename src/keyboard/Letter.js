function Letter(props) {
    return (
        <button style={{ backgroundColor: props.used ? "gray" : "default" }} className="Letter" onClick={() => props.typeLetter(props.value)}>
            {props.value.toUpperCase()}
        </button>
    );
}

export default Letter;
