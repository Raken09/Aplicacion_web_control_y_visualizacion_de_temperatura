#line 1 "C:\\Users\\CARLOS\\Documents\\Arduino\\Proyecto_Micros\\Proyecto_Micros.ino"
#include <DHT.h>
#include <DHT_U.h>
#define DHTPIN 18
const int LEDAI = 23;
const int LEDA = 22;
const int LEDN = 21;
const int LEDB = 19;
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

//Incluir librerías de WiFi
#include <WiFi.h>
#include "FirebaseESP32.h"
//Credenciales de la red WiFi
#define WIFI_SSID "ACSAT"
#define WIFI_PASSWORD "3114830604AC"

//Credenciales Firebase.
#define FIREBASE_HOST "https://proyectomicroprocesadore-522a6-default-rtdb.firebaseio.com/"
#define FIREBASE_AUTH "Xtntd2jPKjLIvUUbtxB5niTEDArtkcL4PxZMJp5x"

//Firebase Data Object
FirebaseData firebaseControl;
FirebaseData firebaseData;
FirebaseData Alarma;
String nodo = "/Sensores";
bool iterar = true;
float temp, hum;

void setup() {
Serial.begin(230400);
Serial.println();
dht.begin();
pinMode(LEDAI, OUTPUT);
pinMode(LEDA, OUTPUT);
pinMode(LEDN, OUTPUT);
pinMode(LEDB, OUTPUT);
WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
Serial.print("Conectado a la red WiFi");
while (WiFi.status() !=WL_CONNECTED){
  Serial.print(".");
  delay(300);
  }
  Serial.println();
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true); 
}

void loop() {
  //Lectura del sensor.
  hum=dht.readHumidity();
  temp=dht.readTemperature();
  
  //Escritura de datos a Firebase.
  Serial.println("Temperatura: " + String(temp) + " Humedad: " + String(hum) );
  Firebase.setFloat(firebaseData, nodo + "/Humedad", hum);
  Firebase.setFloat(firebaseData, nodo + "/Temperatura", temp);
  
  //Obtener datos de Firebase para el aire acondicionado.
  Firebase.getInt(firebaseControl, nodo + "/Control");
  Serial.println(firebaseControl.intData());
  
  //Obtener datos de Firebase para alarmar los leds.
  Firebase.getInt(Alarma, nodo + "/Alarma");
  Serial.println(Alarma.intData());
    
  //Led Aire Acondicionado.
  if(firebaseControl.intData()==1){
    digitalWrite(23, HIGH);
    }
  if(firebaseControl.intData()==0){
    digitalWrite(23, LOW);
    }
    
  //Led Temperatura Alta.
  if(Alarma.intData()==2){
    digitalWrite(22, HIGH);
    digitalWrite(21, LOW);
    digitalWrite(19, LOW);
    }

  //Led Temperatura Normal.
  if(Alarma.intData()==3){
    digitalWrite(22, LOW);
    digitalWrite(21, HIGH);
    digitalWrite(19, LOW);
    }

 //Led Temperatura Baja.
  if(Alarma.intData()==4){
    digitalWrite(22, LOW);
    digitalWrite(21, LOW);
    digitalWrite(19, HIGH); 
    }
    
 delay(2500);
}
