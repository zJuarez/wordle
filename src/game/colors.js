const getColor = (colorCode) => {
    let color = "transparent"
    if (colorCode === 'v') {
        color = "#a9cbd9"
    } else if (colorCode === 'a') {
        color = "#ffdd6e"
    } else if (colorCode === 'g') {
        color = "gray"
    } else if (colorCode === 'f') {
        color = "rgb(211,214,218)"
    }
    return color;
}

export { getColor };