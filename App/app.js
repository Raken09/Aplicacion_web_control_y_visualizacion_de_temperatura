// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

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

//Escritura de datos 
function enviarDatos (alarma, aireAcondicionado) {
    const alarm = alarma;
    const aire = aireAcondicionado;
    set(ref(db, 'Sensores/'), {
        Alarma: alarm,
        Control: aire,
    });
}

// Lectura temperatura
const temperatura = ref(db, 'Sensores/' + '/Temperatura');
onValue(temperatura, (snapshot) => {
    const datosTemp = snapshot.val();
    const temp = document.getElementById('temp');
    temp.innerText = datosTemp + ' °C';
    console.log("Temperatura:",datosTemp);
    
    const tempMax = document.getElementById('tempMax');
    const valTempMax = tempMax.value;
    const tempMin = document.getElementById('tempMin');
    const valTempMin = tempMin.value;
    const termometro = document.getElementById('termometro');

    if (datosTemp > valTempMax) {
        estado.innerText = "Temperatura alta!!";
        termometro.classList.remove("fa-thermometer-empty");
        termometro.classList.remove("fa-thermometer-half");
        termometro.classList.add("fa-thermometer-full");
        //enviarDatos(2,1);
    } else if (datosTemp < valTempMin) {
        estado.innerText = "Temperatura baja";
        termometro.classList.remove("fa-thermometer-full");
        termometro.classList.remove("fa-thermometer-half");
        termometro.classList.add("fa-thermometer-empty");
        //enviarDatos(4,0);
    } else {
        estado.innerText = "Temperatura normal";
        termometro.classList.remove("fa-thermometer-full");
        termometro.classList.remove("fa-thermometer-empty");
        termometro.classList.add("fa-thermometer-half");
        //enviarDatos(3,0);
    }
});
/*
fa-thermometer-empty – Vacío
fa-thermometer-quarter – Un cuarto
fa-thermometer-half – A la mitad
fa-thermometer-three-quarters – Tres cuartos
fa-thermometer-full – Lleno
*/
// Lectura humedad
const humedad = ref(db, 'Sensores/' + '/Humedad');
onValue(humedad, (snapshot) => {
    const data = snapshot.val();
    const hum = document.getElementById('hum');
    hum.innerText = data + " %";
    console.log("Humedad:",data);
});


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
    minima.textContent = this.value + " °C";
}

// Escritura de datos
const alarm = 1;
const aire = 2;
set(ref(db, 'Sensores/'), {
    Alarma: alarm,
    Control: aire,
});

// Estado alarma
//const alarma = ref(db, 'Sensores/' + '/Alarma');
//onValue(alarma, (snapshot) => {
    //const data = snapshot.val();
    //const alarm = document.getElementById('alarm');
    //alarm.innerText = data;
    //console.log("Alarma:",data);
//});

//2 : Temperatura alta
//3 : Temperatura normal
//4 : Temperatura baja
// Tomar el valor de la etiqueta temperatura xddd


