import { score } from "./food.js"

const scoreBoard = document.getElementById("score")
const highScoreBoard = document.getElementById("high-score")

const highScore = localStorage.getItem("high-score")

if (!highScore) {
    localStorage.setItem("high-score", 0)
}

export const displayScore = () => {
    scoreBoard.innerHTML = score.toString()
    highScoreBoard.innerHTML = highScore.toString()

    if (score > highScore) {
        localStorage.setItem("high-score", score)
    }
}