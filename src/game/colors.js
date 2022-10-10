const getColor = (colorCode) => {
    let color = "transparent"
    if (colorCode === 'v') {
        color = "green"
    } else if (colorCode === 'a') {
        color = "yellow"
    } else if (colorCode === 'g') {
        color = "gray"
    } else if (colorCode === 'f') {
        color = "lightgray"
    }
    return color;
}

export { getColor };