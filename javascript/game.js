import { SNAKE_SPEED, updateSnake, drawSnake, getSnakeHead } from "./snake.js"
import { updateFood, drawFood, score } from "./food.js"
import { drawObsticale, checkObsticale } from "./obsticales.js"
import { outSideGrid } from "./grid.js"
import { displayScore } from "./score.js"

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById("game-board")

// game loop

const main = (currentTime) => {
    if (gameOver) {
        if (confirm(`Game Over. Your final score is ${score} points. Press Enter to restart the game.`)) {
            window.location = "/"
        }
        return
    }

    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000

    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    lastRenderTime = currentTime

    update()
    draw()
    checkDeath()
    displayScore()
    // checkForInitialEat()
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
    gameOver = outSideGrid(getSnakeHead()) || checkObsticale()
}