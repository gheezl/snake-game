import { getInputDirection } from "./input.js"

// a few variables

export const SNAKE_SPEED = 50


// initail snake location

const snakeBody = { x: 25, y: 25 }

// updates the snake location

export const updateSnake = () => {
    const inputDirection = getInputDirection()
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }
    }

    snakeBody.x += inputDirection.x
    snakeBody.y += inputDirection.y
}

// draws the initial snake location and sets the color

const colors = [
    [false, "black"],
    [false, "lightgreen"],
    [false, "lightblue"],
    [false, "red"],
    [false, "white"],
    [false, "yellow"]
]

const setColor = (input) => {
    colors.map(color => {
        if (input === color[1]) {
            color[0] = true
        }
        else {
            color[0] = false
        }
    })
}

document.getElementById("black").onclick = () => setColor("black")
document.getElementById("lightblue").onclick = () => setColor("lightblue")
document.getElementById("lightgreen").onclick = () => setColor("lightgreen")
document.getElementById("red").onclick = () => setColor("red")
document.getElementById("white").onclick = () => setColor("white")
document.getElementById("yellow").onclick = () => setColor("yellow")


export const drawSnake = (gameBoard) => {
    const snakeElement = document.createElement("div")
    snakeElement.style.gridRowStart = snakeBody.y
    snakeElement.style.gridColumnStart = snakeBody.x
    colors.map(color => {
        if (color[0]) {
            snakeElement.style.backgroundColor = color[1]
        }
    })
    snakeElement.classList.add("snake")
    snakeElement.id = "snake"
    gameBoard.appendChild(snakeElement)
}

// checks if the square is on anything

export const onSnake = (position) => {
    return equalPositions(snakeBody, position)
}

export const equalPositions = (position1, position2) => {
    return position1.x === position2.x && position1.y === position2.y
}

// simply returns the head of the snake

export const getSnakeHead = () => {
    return snakeBody
}