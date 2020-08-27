import { onSnake } from "./snake.js"

// these are the obsticale positions

export let obsticalePositions = [
    { x: 10, y: 25 },
    { x: 25, y: 45 },
    { x: 40, y: 25 },
    { x: 40, y: 45 },
    { x: 10, y: 45 },
]

// checks if the square is on the obsticale

export const checkObsticale = () => {
    let isOnObsticale = false

    obsticalePositions.map(obsticalePosition => {
        if (onSnake(obsticalePosition)) return isOnObsticale = true

        return false
    })

    return isOnObsticale
}

// this draws the obsticale

export const drawObsticale = (gameBoard) => {
    obsticalePositions.map(position => {
        const obsticaleElement = document.createElement("div")
        obsticaleElement.style.gridRowStart = position.y
        obsticaleElement.style.gridColumnStart = position.x
        obsticaleElement.classList.add("obsticale")
        gameBoard.appendChild(obsticaleElement)
    })
}