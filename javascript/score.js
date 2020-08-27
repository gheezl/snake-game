import { score } from "./food.js"


const scoreBoard = document.getElementById("score")

export const displayScore = () => {
    scoreBoard.innerHTML = score.toString()
}