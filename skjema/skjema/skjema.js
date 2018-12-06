//@ts-check
function setup() {
    let inpElevnr = document.getElementById("elevnr");
    let inpFornavn = document.getElementById("fornavn");
    let inpEtternavn = document.getElementById("etternavn");
    let inpKlasse = document.getElementById("klasse");
    let inpAlder = document.getElementById("alder");
    let inpKontaktlærer = document.getElementById("kontaktlærer");
    let btnLagre = document.getElementById("lagre");
   
    btnLagre.addEventListener("click", lagreData);

    function lagreData() {
        let elevnr = inpElevnr.value;
        let navn = inpFornavn.value;
        let adresse = inpEtternavn.value;
        let epost = inpKlasse.value;
        let mobil = inpAlder.value;
        let land = inpKontaktlærer.value;
        let bokData = {elevnr,navn,adresse,epost,mobil,land};
        localStorage.setItem("Elevnr", JSON.stringify(brukerData));

    }

}