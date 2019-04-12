// @ts-check

function setup() {
    let neste = "kryss";
    let divBrett = document.getElementById("brett");
    let alleRuter = Array.from(document.querySelectorAll("div.rute"));
    for (let i=0; i< alleRuter.length; i++) {
        let ruter = alleRuter[i];
        ruter.id = "r" + i;
    }

    divBrett.addEventListener("click", settKryss);

    function settKryss(e) {
        let t = e.target

        t.classList.add(neste);
        if (neste=== "kryss") {
            neste = "sirkel"
        } else {
            neste = "kryss"
        }
    }
}