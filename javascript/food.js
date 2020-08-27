import { onSnake } from "./snake.js"
import { randomGridPosition } from "./grid.js"

// this sets the original food position as well as the new one
let newFoodPosition = { x: 25, y: 10 }

const getRandomFoodPosition = () => {
    while (onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}

// these are some variables

let foodPosition = getRandomFoodPosition()
const EXPANSION_RATE = 1

// this function moves the food location after the snake eats it

export const updateFood = () => {
    if (onSnake(foodPosition)) {
        foodPosition = getRandomFoodPosition()
    }
}

// this creates the food

export const drawFood = (gameBoard) => {
    const foodElement = document.createElement("div")
    foodElement.style.gridRowStart = foodPosition.y
    foodElement.style.gridColumnStart = foodPosition.x
    foodElement.classList.add("food")
    gameBoard.appendChild(foodElement)
}



