import { onSnake, expandSnake } from "./snake.js"

let foodPosition = { x: 20, y: 10 }
const EXPANSION_RATE = 1

export const updateFood = () => {
    if (onSnake(foodPosition)) {
        expandSnake(EXPANSION_RATE)
        foodPosition = { x: 20, y: 20 }
    }
}

export const drawFood = (gameBoard) => {
    const foodElement = document.createElement("div")
    foodElement.style.gridRowStart = foodPosition.y
    foodElement.style.gridColumnStart = foodPosition.x
    foodElement.classList.add("food")
    gameBoard.appendChild(foodElement)
}