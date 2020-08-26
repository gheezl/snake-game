import { SNAKE_SPEED, updateSnake, drawSnake } from "./snake.js"
import { updateFood, drawFood } from "./food.js"

let lastRenderTime = 0
const gameBoard = document.getElementById("game-board")

const main = (currentTime) => {
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000

    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    lastRenderTime = currentTime
    console.log("hi")

    update()
    draw()
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