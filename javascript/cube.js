import { getInputDirection } from "./input.js"

// initail cube location

const cubeBody = { x: 25, y: 25 }

// updates the snake location

export const updateCube = () => {
    const inputDirection = getInputDirection()
    for (let i = cubeBody.length - 2; i >= 0; i--) {
        cubeBody[i + 1] = { ...snakeBody[i] }
    }

    cubeBody.x += inputDirection.x
    cubeBody.y += inputDirection.y
}

// sets the color

const colors = [
    [false, "black"],
    [false, "lightgreen"],
    [false, "lightblue"],
    [false, "red"],
    [false, "white"],
    [false, "yellow"]
]

const previousColor = localStorage.getItem("set-color")
if (previousColor) {
    document.getElementById(previousColor).style.color = previousColor
}

const setColor = (input) => {
    colors.map(color => {
        if (input === color[1]) {
            localStorage.setItem("set-color", input)
            color[0] = true
            document.getElementById(color[1]).style.color = color[1]
        }
        else {
            color[0] = false
            document.getElementById(color[1]).style.color = "white"
        }
    })
}

document.getElementById("black").onclick = () => setColor("black")
document.getElementById("lightblue").onclick = () => setColor("lightblue")
document.getElementById("lightgreen").onclick = () => setColor("lightgreen")
document.getElementById("red").onclick = () => setColor("red")
document.getElementById("white").onclick = () => setColor("white")
document.getElementById("yellow").onclick = () => setColor("yellow")

// draws the initial snake location

export const drawCube = (gameBoard) => {
    const cubeElement = document.createElement("div")
    cubeElement.style.gridRowStart = cubeBody.y
    cubeElement.style.gridColumnStart = cubeBody.x
    cubeElement.style.backgroundColor = previousColor
    colors.map(color => {
        if (color[0]) {
            cubeElement.style.backgroundColor = color[1]

        }
    })
    cubeElement.classList.add("cube")
    cubeElement.id = "cube"
    gameBoard.appendChild(cubeElement)
}

// checks if the square is on anything

export const onCube = (position) => {
    return equalPositions(cubeBody, position)
}

export const equalPositions = (position1, position2) => {
    return position1.x === position2.x && position1.y === position2.y
}

// simply returns the head of the snake

export const getSnakeHead = () => {
    return cubeBody
}