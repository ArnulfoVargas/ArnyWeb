let button   = document.getElementById("send");

let age      = document.getElementById("age");
let username = document.getElementById("name");
let dir      = document.getElementById("dir");
let drugs    = document.getElementById("drugs");

let result   = document.getElementById("stringify");
let resultDiv= document.getElementById("results");

button.addEventListener("click", onClickEvent);

const addedItems = [];
const baseObject = {
    "name"      : "",
    "age"       : 0,
    "direction" : "",
    "drugs"     : false,
    "adult"     : false
};

function onClickEvent(){
    createObject();

    resetValues();

    addedItems.push({...baseObject});
    
    console.log(addedItems);

    addStringify();
}

function addStringify(){
    resultDiv.hidden = false;
    let stringResult = '';

    for (const item of addedItems) {
        stringResult += JSON.stringify(item) + "\n";
    }
    result.innerText = stringResult;
}

function resetValues(){
    username.value = "";
    age.value = null;
    dir.value = "";
    drugs.checked = false;
}

function createObject() {
    baseObject.name = username.value;
    baseObject.age = Number( age.value );
    baseObject.direction = dir.value;
    baseObject.drugs = drugs.checked;
    baseObject.adult = age.value >= 18;
}
