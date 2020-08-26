import { getInputDirection } from "./input.js"

export const SNAKE_SPEED = 50

const snakeBody = [
    { x: 25, y: 25 },
    { x: 24, y: 25 },
    { x: 23, y: 25 }
]

export const updateSnake = () => {
    const inputDirection = getInputDirection()
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }
    }

    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}

export const drawSnake = (gameBoard) => {
    snakeBody.map(segment => {
        const snakeElement = document.createElement("div")
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.classList.add("snake")
        gameBoard.appendChild(snakeElement)
    })
}