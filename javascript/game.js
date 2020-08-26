import { SNAKE_SPEED, updateSnake, drawSnake, getSnakeHead, snakeIntersection } from "./snake.js"
import { updateFood, drawFood } from "./food.js"
import { outSideGrid } from "./grid.js"

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById("game-board")

const main = (currentTime) => {
    if (gameOver) {
        return alert("Game Over")
    }


    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000

    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    lastRenderTime = currentTime
    console.log("hi")

    update()
    draw()
    checkDeath()
}

window.requestAnimationFrame(main)

const update = () => {
    updateSnake()
    updateFood()
}

const draw = () => {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

const checkDeath = () => {
    gameOver = outSideGrid(getSnakeHead()) || snakeIntersection()
}