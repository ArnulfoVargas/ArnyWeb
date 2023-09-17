const playerScoreText = document.getElementById("blue-score")
const enemyScoreText = document.getElementById("red-score")

let playerScore = 0;
let enemyScore = 0;

playerScoreText.innerText = playerScore;
enemyScoreText.innerText = enemyScore;

export const updateScore = (result) => {
    if(result === 1){
        playerScore ++;
    }
    else if (result === -1){
        enemyScore ++;
    }

    playerScoreText.innerText = playerScore;
    enemyScoreText.innerText = enemyScore;
}