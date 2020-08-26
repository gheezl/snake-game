import { onSnake, expandSnake } from "./snake.js"
import { randomGridPosition } from "./grid.js"

// this sets the original food position as well as the new one

const getRandomFoodPosition = () => {
    let newFoodPosition = { x: 25, y: 10 }
    while (newFoodPosition === null || onSnake(newFoodPosition)) {
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
        expandSnake(EXPANSION_RATE)
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



