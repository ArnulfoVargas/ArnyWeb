const IDs = ["e-rock", "e-paper", "e-scissors"]
const types = ["rock", "paper", "scissors"]
let lastId;

export const enemySelection = (id) => {
    const index = Math.floor(Math.random() * 3);
    const element = document.getElementById(IDs[index])

    lastId = IDs[index];
    
    if(id === types[index])
    {
        element.style.backgroundColor = "#FFB000"
        return 0
    }
    else if((id === "rock" && types[index] === "paper") ||
            (id === "paper" && types[index] === "scissors") ||
            (id === "scissors" && types[index] === "rock"))
    {
        element.style.backgroundColor = "#7A9D54"
        return -1
    }
    else
    {
        element.style.backgroundColor = "#F31559"
        return 1;
    }
} 

export const reset = () => {
    if(lastId) 
        document.getElementById(lastId).style.backgroundColor = "white"
}