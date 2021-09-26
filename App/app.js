// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getDatabase, ref, onValue, set, child, get } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAcrZBUOlljw1bNWsG5iIQDwSsVs-7kWMY",
    authDomain: "proyectomicroprocesadore-522a6.firebaseapp.com",
    projectId: "proyectomicroprocesadore-522a6",
    storageBucket: "proyectomicroprocesadore-522a6.appspot.com",
    messagingSenderId: "1042381514567",
    appId: "1:1042381514567:web:3c1e777a430caaccd54e62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Lectura temperatura
setInterval(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `Sensores/${"Temperatura"}`)).then((snapshot) => {
        if (snapshot.exists()) {
            const datosTemp = snapshot.val();
            //console.log("Temperatura get: ",datosTemp);
            const temp = document.getElementById('temp');
            temp.innerText = datosTemp + ' °C';
            console.log("Temperatura:",datosTemp);

            const tempMax = document.getElementById('tempMax');
            const valTempMax = tempMax.value;
            const tempMin = document.getElementById('tempMin');
            const valTempMin = tempMin.value;
            const termometro = document.getElementById('termometro');
            const estado = document.getElementById('estado');
            const imEstado = document.getElementById('imEstado');
            const aire = document.getElementById('aire');
            const imAire = document.getElementById('imAire');
            
            if (datosTemp > valTempMax) {
                estado.innerText = "Temperatura alta";
                imEstado.src = "./imag/calor.png";
                imAire.src = "./imag/aire.png";
                aire.innerText = "Aire acondicionado encendido";
                termometro.classList.remove("fa-thermometer-empty");
                termometro.classList.remove("fa-thermometer-half");
                termometro.classList.add("fa-thermometer-full");
                //enviarDatos(2,1);
            } else if (datosTemp < valTempMin) {
                estado.innerText = "Temperatura baja";
                imEstado.src = "./imag/frio.png";
                imAire.src.
                aire.innerText = "Aire acondicionado apagado";
                termometro.classList.remove("fa-thermometer-full");
                termometro.classList.remove("fa-thermometer-half");
                termometro.classList.add("fa-thermometer-empty");
                //enviarDatos(4,0);
            } else {
                estado.innerText = "Temperatura normal";
                imEstado.src = "./imag/normal.png";
                aire.innerText = "Aire acondicionado apagado";
                termometro.classList.remove("fa-thermometer-full");
                termometro.classList.remove("fa-thermometer-empty");
                termometro.classList.add("fa-thermometer-half");
                //enviarDatos(3,0);
            }
        } else {
        console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
} , 1000);

/*
fa-thermometer-empty – Vacío
fa-thermometer-quarter – Un cuarto
fa-thermometer-half – A la mitad
fa-thermometer-three-quarters – Tres cuartos
fa-thermometer-full – Lleno
*/
// Lectura humedad
setInterval(() => { 
    const dbRef = ref(getDatabase());
    get(child(dbRef, `Sensores/${"Humedad"}`)).then((snapshot) => {
        if (snapshot.exists()) {
            const datosHum = snapshot.val();
            const hum = document.getElementById('hum');
            hum.innerText = datosHum + " %";
            console.log("Humedad:",datosHum);
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
} , 1000);


// Sliders temperatura
// Temperatura maxima
const sliderMax = document.querySelector(".input1");
const maxima = document.querySelector(".maxima");
maxima.textContent = sliderMax.value;
sliderMax.oninput = function () {
    maxima.textContent = this.value;
}

// Temperatura minima
const sliderMin = document.querySelector(".input2");
const minima = document.querySelector(".minima");
minima.textContent = sliderMin.value;
sliderMin.oninput = function () {
    minima.textContent = this.value;
}

//Escritura de datos 
function enviarDatos (alarma, aireAcondicionado) {
    const alarm = alarma;
    const aire = aireAcondicionado;
    set(ref(db, 'Sensores/'), {
        Alarma: alarm,
        Control: aire,
    });
}

setInterval(() => {
    const termometro = document.getElementById('termometro');
    const lleno = termometro.classList.contains("fa-thermometer-full");
    //const mitad = termometro.classList.contains("fa-thermometer-half");
    const vacio = termometro.classList.contains("fa-thermometer-empty");

    if (lleno === true) {
        enviarDatos(2,1);
    
    } else if (vacio === true) {
        enviarDatos(4,0);
    } else {
        enviarDatos(3,0);
    }
},2500);
//2 : Temperatura alta
//3 : Temperatura normal
//4 : Temperatura baja
// Tomar el valor de la etiqueta temperatura xddd