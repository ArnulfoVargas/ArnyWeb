const active_class = "game-button";
const inactive_class = "locked";

// Buttons
const button1 = document.getElementById("color-button-one");
button1.addEventListener("click", onClickButton)
const button2 = document.getElementById("color-button-two");
button2.addEventListener("click", onClickButton)
const button3 = document.getElementById("color-button-three");
button3.addEventListener("click", onClickButton)
const buttons = [button1, button2, button3];

const continue_button = document.getElementById("continue-button");
continue_button.addEventListener("click", continueButton)

// Color Cards
const color1 = document.getElementById("color-one");
const color2 = document.getElementById("color-two");
const color3 = document.getElementById("color-three");
const color_cards = [color1, color2, color3];

// Hex
const hex_text = document.getElementById("hex");

// Game Values
let correct_index = 0;
let correct_hex = "";
let clicked_index = 0;
let locked = false;
const high_score = localStorage.getItem("high");

let score = 0;

function setNewColors(){
    correct_index = Math.floor(Math.random() * 3);

    for(e in color_cards){
        let curret_hex = getRandomHexColor();

        color_cards[e].style.backgroundColor = curret_hex;

        if(e == correct_index){
            correct_hex = curret_hex;
            hex_text.innerText = correct_hex.toUpperCase();
        }
    }
}

function getRandomHexColor(){
    const letters = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
    let value = "#";

    for(i = 0; i < 6; i++){
        let index = Math.floor(Math.random() * letters.length);

        value += letters[index];
    }

    return value;
}

function onClickButton(e){
    if (locked) return;

    disableButtons()

    let id_to_evaluate = e.currentTarget.id;

    if (id_to_evaluate === "color-button-one") clicked_index = 0;
    else if (id_to_evaluate === "color-button-two") clicked_index = 1;
    else clicked_index = 2;

    if (clicked_index === correct_index) 
    {
        hex_text.innerText = "Correct"
        score++;
    }
    else 
    {
        hex_text.innerText = "Failed"

        if(high_score == null || high_score < score)
        {
            localStorage.setItem("high", score);
        }

        score = 0;
    }

    continue_button.firstChild.innerText = "Continue"
    continue_button.className = "continue-button"
}

function disableButtons(){
    locked = true;

    for(e of buttons){
        e.className = inactive_class;
        e.firstChild.innerText = "Locked";
    }
}

function enableButtons(){
    locked = false;

    for(e of buttons){
        e.className = active_class;
        e.firstChild.innerText = "Select";
    }
}

function continueButton(){

    if (!locked) return; 

    locked = true;
    continue_button.className = "continue-button-locked"
    continue_button.firstChild.innerText = "Locked"

    enableButtons()
    setNewColors();
}

setNewColors()