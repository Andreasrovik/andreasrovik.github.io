function setup() {
    let lyd = document.getElementById("lyd");
    let divAstro = document.getElementById("astro");
    divAstro.addEventListener("click", spill);
   
    function spill() {
      lyd.play();
    }
  }