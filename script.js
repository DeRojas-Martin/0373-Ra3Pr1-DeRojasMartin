// elements del DOM per relacionar script amb html
let formulari = document.getElementById("formulariAlumne");
let inputNom = document.getElementById("nom");
let inputExamen = document.getElementById("examen");
let inputPractiques = document.getElementById("practiques");
let inputActitud = document.getElementById("actitud");
let missatge = document.getElementById("missatge");
let cosTaula = document.getElementById("cosTaula");

let botoAsc = document.getElementById("ordenarAsc");
let botoDesc = document.getElementById("ordenarDesc");

// Array per els alumnes
let alumnes = [];

// aquest event es per fer submint en la meva web
formulari.addEventListener("submit", function(event) {
    // aquest function event es per a quan fem submit el navegador encomptas de fer refresh i es perd tot el que af es guardar les dades
    event.preventDefault();

    let valid = validarFormulari();

    // aquesta comanda es per si la validacio damunt a sortit ve comança el if
    if (valid.correcte) {
        // com diu el nom en aqui creem un objecte / usuari
        let alumne = crearAlumne();
        // amb push guardem el alumne / objecte creat en la array que hem fet amunt
        alumnes.push(alumne);
        mostrarAlumnes();
        missatge.innerHTML = "el Alumne s'ha afegit correctament";
        missatge.classList.remove("error");
        missatge.classList.add("correcte");
    } else {
        mostrarErrors(valid.errors);
    }
});