import { score, time } from "./food.js"
const scoreBoard = document.getElementById("score")
const timeBoard = document.getElementById("time")

export const displayScore = () => {
    scoreBoard.innerHTML = score.toString()
    timeBoard.innerHTML = time.toString()
}