//@ts-check


function setup() {
    let divBrett = document.getElementById("brett");
    for (let i=0; i < 5000; i += 1) {
        let div = document.createElement("div");
        div.className = "rute";
        divBrett.appendChild(div);
    }
}