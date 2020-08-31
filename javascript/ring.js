import { onCube } from "./cube.js"
import { obsticalePositions } from "./obsticales.js"
import { randomGridPosition } from "./grid.js"

// this sets the starting ring position

let newRingPosition = { x: 25, y: 10 }

const getRandomRingPosition = () => {
    while (onCube(newRingPosition)) {
        newRingPosition = randomGridPosition()
    }
    return newRingPosition
}

// these are some variables

let ringPosition = getRandomRingPosition()
export let time = 0
export let score = 0
let interval = null

// this is the timer

export const myTimer = () => {
    time = time + 1
    return
}

// this repositions the ring and obsticales after you catch a ring

export const updateRing = () => {
    if (onCube(ringPosition)) {
        ringPosition = getRandomRingPosition()
        obsticalePositions[0] = randomGridPosition()
        obsticalePositions[1] = randomGridPosition()
        obsticalePositions[2] = randomGridPosition()
        obsticalePositions[3] = randomGridPosition()
        obsticalePositions[4] = randomGridPosition()
        score += (10 - time)
        time = 0
        if (interval) {
            clearInterval(interval)
        }
        interval = setInterval(myTimer, 1000)
    }
}

// this draws the ring on the board

export const drawRing = (gameBoard) => {
    const ringElement = document.createElement("div")
    ringElement.style.gridRowStart = ringPosition.y
    ringElement.style.gridColumnStart = ringPosition.x
    ringElement.classList.add("food")
    gameBoard.appendChild(ringElement)
}



