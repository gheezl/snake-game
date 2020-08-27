import { onSnake } from "./snake.js"
import { randomGridPosition } from "./grid.js"


export let obsticalePositions = [
    { x: 10, y: 25 },
    { x: 25, y: 45 },
    { x: 40, y: 25 },
    { x: 40, y: 45 },
    { x: 10, y: 45 },
]

// updates obsticale

// export const updateObsticale = () => {
//     obsticalePositions.map(obsticale => {
//         if (onSnake(obsticale)) {
//             obsticale = randomGridPosition()
//         }
//     })
// }

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