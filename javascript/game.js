import { updateCube, drawCube, getSnakeHead } from "./cube.js"
import { updateRing, drawRing, score } from "./ring.js"
import { drawObsticale, checkObsticale } from "./obsticales.js"
import { outSideGrid } from "./grid.js"
import { displayScore } from "./score.js"

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById("game-board")
let gameSpeed = 50

// this sets the difficulty

const previousDifficulty = localStorage.getItem("set-difficulty")
const previousSpeed = localStorage.getItem("set-speed")

if (previousDifficulty && previousSpeed) {
    gameSpeed = previousSpeed
    document.getElementById(previousDifficulty.toString()).style.color = "red"
}


const setSpeed = (speed, difficulty) => {
    gameSpeed = speed
    localStorage.setItem("set-difficulty", difficulty[0])
    localStorage.setItem("set-speed", speed)
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
}

// initial run of the game loop

window.requestAnimationFrame(main)

// updates everything

const update = () => {
    updateCube()
    updateRing()
}

// draws everything

const draw = () => {
    gameBoard.innerHTML = ''
    drawCube(gameBoard)
    drawRing(gameBoard)
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