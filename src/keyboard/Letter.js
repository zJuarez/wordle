function Letter(props) {
    return (
        <button className="Letter" onClick={() => props.typeLetter(props.value)}>
            {props.value.toUpperCase()}
        </button>
    );
}

export default Letter;
