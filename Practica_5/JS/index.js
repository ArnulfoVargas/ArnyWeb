const selection = document.getElementById("selection");
const button = document.getElementById("button");
const results = document.getElementById("results");

let text = "";

button.addEventListener("click", () => {
    data()
})

const data = async() => {
    try{
        const endpoint = "http://www.boredapi.com/api/activity?type=" + selection.value;
        const response = await fetch(endpoint);
        const data = await response.json();

        let {activity, participants} = data;

        console.log(data);

        text += "<p>" + activity + "</p>" +
        "<p><strong>For: </strong> " + participants + " participants</p> <hr>";

        results.innerHTML = "<h1>Results</h1> <hr>" + text;
    }
    catch{
        return null;
    }
};