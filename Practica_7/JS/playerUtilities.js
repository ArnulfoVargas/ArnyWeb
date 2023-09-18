import {enemySelection, reset} from "./enemyUtilities.js"
import {updateScore} from "./scoreUtilities.js"

const IDs = ["rock", "paper", "scissors"]

export const init = () => {
    for(let id of IDs){
        const element = document.getElementById(id);

        element.addEventListener("click", (e)=>{
            const id = e.currentTarget.id;
            const result = enemySelection(id)
            const child = document.querySelector(`#${id} .card`)

            switch (result){
                case -1: 
                    child.style.backgroundColor = "#F31559"
                    break
                case 0:
                    child.style.backgroundColor = "#FFB000"
                    break
                case 1:
                    child.style.backgroundColor = "#7A9D54"
                    break
            }

            updateScore(result)

            setTimeout(()=>{
                child.style.backgroundColor = "white"
                reset()
                }, 250)
        })
    }
}