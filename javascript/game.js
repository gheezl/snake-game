import { SNAKE_SPEED, updateSnake, drawSnake, getSnakeHead } from "./snake.js"
import { updateFood, drawFood } from "./food.js"
import { drawObsticale } from "./obsticales.js"
import { outSideGrid } from "./grid.js"

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById("game-board")

// game loop

const main = (currentTime) => {
    if (gameOver) {
        if (confirm("Game Over. Press Enter to restart the game.")) {
            window.location = "/"
        }
        return
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

// initial run of the game loop

window.requestAnimationFrame(main)

// updates everything

const update = () => {
    updateSnake()
    updateFood()
}

// draws everything

const draw = () => {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
    drawObsticale(gameBoard)
}

// checks for game over

const checkDeath = () => {
    gameOver = outSideGrid(getSnakeHead())
}