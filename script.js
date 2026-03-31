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

// event de submit


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


// validacio del formulari, les notes tenen que estar dintre del rang

function validarFormulari() {
    let errors = [];

    let nom = inputNom.value;
    let examen = inputExamen.value;
    let practiques = inputPractiques.value;
    let actitud = inputActitud.value;

    if (nom === "") {
        errors.push("El nom no pot estar buit");
    }

    if (examen === "" || examen < 0 || examen > 10) {
        errors.push("Examen incorrecte no esta dintre del rang (0-10)");
    }

    if (practiques === "" || practiques < 0 || practiques > 10) {
        errors.push("Pràctiques incorrectes estan fora del rang (0-10)");
    }

    if (actitud === "" || actitud < 0 || actitud > 10) {
        errors.push("Actitud incorrecta no esta dintre del rang(0-10)");
    }

    return {
        correcte: errors.length === 0,
        errors: errors
    };
}

// mostrar errors del formulari

function mostrarErrors(errors) {
    let text = "";

    for (let i = 0; i < errors.length; i++) {
        text += errors[i] + "<br>";
    }

    missatge.innerHTML = text;
}

// creacio dels alumnes i if de aprovat o suspes

function crearAlumne() {
    let nom = inputNom.value;
    let examen = Number(inputExamen.value);
    let practiques = Number(inputPractiques.value);
    let actitud = Number(inputActitud.value);

    let notaFinal = (examen * 0.6) + (practiques * 0.3) + (actitud * 0.1);

    let estat;

    if (notaFinal >= 5) {
        estat = "Aprovat";
    } else 
        estat = "Suspès";
}

    return {
        nom: nom,
        examen: examen,
        practiques: practiques,
        actitud: actitud,
        notaFinal: notaFinal,
        estat: estat 
    };

// mostrar els alumnes

function mostrarAlumnes() {
    cosTaula.innerHTML = "";

    for (let i = 0; i < alumnes.length; i++) {
        cosTaula.innerHTML += "<tr><td>" + alumnes[i].nom + "</td><td>" + alumnes[i].notaFinal + "</td><td>" + alumnes[i].estat + "</td></tr>";
    }
}

// ordenacio de la llista d'alumnes de (+ a -) i de (- a +)
botoAsc.addEventListener("click", function() {
    alumnes.sort(function(a, b) {
        return a.notaFinal - b.notaFinal;
    });
    mostrarAlumnes();
});

botoDesc.addEventListener("click", function() {
    alumnes.sort(function(a, b) {
        return b.notaFinal - a.notaFinal;
    });
    mostrarAlumnes();
});