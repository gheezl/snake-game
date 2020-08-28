import { updateSnake, drawSnake, getSnakeHead } from "./cube.js"
import { updateFood, drawFood, score } from "./food.js"
import { drawObsticale, checkObsticale } from "./obsticales.js"
import { outSideGrid } from "./grid.js"
import { displayScore } from "./score.js"

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById("game-board")
let gameSpeed = 50

// this sets the difficulty

const setSpeed = (speed, difficulty) => {
    gameSpeed = speed
    document.getElementById(difficulty[1]).style.color = "white"
    document.getElementById(difficulty[2]).style.color = "white"
    document.getElementById(difficulty[0]).style.color = "red"
}

document.getElementById("easy").onclick = () => setSpeed(25, ["easy", "normal", "hard"])
document.getElementById("normal").onclick = () => setSpeed(50, ["normal", "easy", "hard"])
document.getElementById("hard").onclick = () => setSpeed(75, ["hard", "easy", "normal"])


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


    if (secondsSinceLastRender < 1 / gameSpeed) return

    lastRenderTime = currentTime

    update()
    draw()
    checkDeath()
    displayScore()
    // displayHighScore()
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

// testing custimazation

export const changeBoxGlow = () => {
    document.getElementById("snake").style.boxShadow = "black"
}