import { getInputDirection } from "./input.js"

// a few variables

export const SNAKE_SPEED = 50
let newSegments = 0

// initail snake location

const snakeBody = [
    { x: 25, y: 25 },
    { x: 24, y: 25 },
    { x: 23, y: 25 }
]

// updates the snake location

export const updateSnake = () => {
    const inputDirection = getInputDirection()
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }
    }

    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}

// draws the initial snake location

export const drawSnake = (gameBoard) => {
    addSegments()
    snakeBody.map(segment => {
        const snakeElement = document.createElement("div")
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.classList.add("snake")
        gameBoard.appendChild(snakeElement)
    })
}

// adds an additional square to the snake after it eats a ring

export const expandSnake = (amount) => {
    newSegments += amount
}

export const onSnake = (position, { ignoreHead = false } = {}) => {
    return snakeBody.some(segment => {
        if (ignoreHead) return false
        return equalPositions(segment, position)
    })
}

export const equalPositions = (position1, position2) => {
    return position1.x === position2.x && position1.y === position2.y
}

// adds a segment to the snake

export const addSegments = () => {
    for (let i = 0; i < newSegments; i++)
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] })

    newSegments = 0
}

// simply returns the head of the snake

export const getSnakeHead = () => {
    return snakeBody[0]
}

export const snakeIntersection = () => {
    let ignoreHead = true
    return onSnake(snakeBody[0], ignoreHead)
}