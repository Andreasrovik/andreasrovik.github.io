// @ts-check
let autokeys = {
    vareID: 0,
    forfatterID: 0,
    forlagID: 0,
    eksemplarID: 0,
    utlaanID: 0,
}

class vare {
    constructor({ vareid=1, varenavn, basispris, beholdning, utgitt=1, forfatterid=1, forlagid=1, sider }) {
        this.vareid = vareid;
        this.varenavn = varenavn;
        this.basispris = basispris;
        this.beholdning = beholdning;
    }
}



let butikk = {
    vare: {},
}

async function lesButikk() {
    let r = await select("select * from vare");
    if (r.results && r.results.length) {
        r.results.forEach(e => {
            let b = new vare(e);
            butikk.vare[b.vareid] = b;
        })
    }
    r = await select("select * from forfatter");
    if (r.results && r.results.length) {
        r.results.forEach(e => {
            let b = new Forfatter(e);
            butikk.forfatter[b.forfatterid] = b;
        })
    }
}





async function setup() {
    let divAntall = document.getElementById("antall");
    let inpvarenavn = document.getElementById("varenavn");
    let inpvareID = document.getElementById("vareid");
    let inpbasispris = document.getElementById("basispris");
    let inpForfatter = document.getElementById("forfatter");
    let inpbeholdning = document.getElementById("beholdning");
    let inpSider = document.getElementById("sider");
    let btnLagre = document.getElementById("lagre");
    btnLagre.addEventListener("click", lagreData);
    await lesbutikkliotek().catch(e => console.log(e));
    divAntall.innerHTML = String(Object.keys(butikk.vare).length);

    function lagreData() {
        let vareid = inpvareID.value;
        let varenavn = inpvarenavn.value;
        let basispris = inpbasispris.value;
        let beholdning = inpbeholdning.value;
        let sider = inpSider.value;

        inpvareID.value = String(+vareid+1);
        inpvarenavn.value = "";
        inpbasispris.value = "";
        inpForfatter.value = "";
        inpbeholdning.value = "";
        inpSider.value = "";

        let vareData = new vare({vareid,varenavn, basispris, beholdning, sider});
        let key = vareData.vareid;
        butikk.vare[key] = vareData;
        divAntall.innerHTML = String(Object.keys(butikk.vare).length);
        upsert('insert into vare (vareid,basispris,varenavn,forfatterid,forlagid,sider,beholdning,utgitt)'+ 
        'values ( $[vareid],$[basispris],$[varenavn],$[forfatterid],$[forlagid],1,$[beholdning],1)', vareData);

        
    }
}

async function vareliste() {
    let divMain = document.getElementById("main");
    let inpbeholdning = document.getElementById("beholdning");

    inpbeholdning.addEventListener("change", oppdaterListe);
    await lesbutikkliotek().catch(e => console.log(e));
    oppdaterListe();

    function oppdaterListe() {
        let s = ""; let varer;
        let beholdning = inpbeholdning.value || "historie";
        if (beholdning === "alle") {
            varer = filtrer(butikk.vare, "beholdning", (e, v) => true);
        } else {
            varer = filtrer(butikk.vare, "beholdning", beholdning);
        }
        varer.forEach(
            vare => {
                let klasse = vare.beholdning;
                vare => {
                    s += <br></br>
                }
                s += "</div></div>";
            }
        );
        divMain.innerHTML = s;
    }
}



function filtrer(liste, egenskap, test) {
    if (!Array.isArray(liste)) {
        // try to make an array
        try {
            liste = Object.keys(liste).map(k => liste[k]);
        } catch (e) {
            liste = [];
        }
    }
    if (typeof test === "function") {
        return liste.filter(e => test(e, egenskap));
    }
    return liste.filter(e => e[egenskap].trim() === test);
}

function upsert(sql="", data) {
    let init = {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ sql,data }),
        headers: {
            "Content-Type": "application/json"
        }
    };
    fetch("runsql", init);
} 


async function select(sql = "select * from vare") {
    let init = {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ sql }),
        headers: {
            "Content-Type": "application/json"
        }
    };
    const response = await fetch("runsql", init);
    let res = await response.json();
    return res;
}