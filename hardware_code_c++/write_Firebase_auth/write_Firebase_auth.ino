
//Include the library
#include <Arduino.h>
#if defined(ESP32)
#include <WiFi.h>
#include <FirebaseESP32.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#elif defined(ARDUINO_RASPBERRY_PI_PICO_W)
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <FirebaseESP8266.h>
#endif

int timestamp;
#include <MQUnifiedsensor.h>
#include "time.h"


#include <Arduino_JSON.h>



// Provide the token generation process info.
#include "addons/TokenHelper.h"
// Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

// Insert your network credentials
#define WIFI_SSID ""
#define WIFI_PASSWORD ""

// Insert Firebase project API Key
#define API_KEY ""

// Insert Authorized Email and Corresponding Password


#define USER_EMAIL "a@gmail.com"
#define USER_PASSWORD "123456"

// Insert RTDB URLefine the RTDB URL
#define DATABASE_URL ""  

// Define Firebase objects
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
FirebaseJson json;

// Variable to save USER UID
String uid;

// Variables to save database paths
String databasePath;
String parentPath;
String timePath = "/timestamp";
String MQ2_H2Path = "/H2";
String MQ2_AlcPath = "/Alc";
String MQ2_PropPath = "/Prop";
String MQ2_LPGPath = "/LPG";
String MQ2_COPath = "/CO";


/************************Hardware Related Macros************************************/
#define         Board                   ("ESP32")
#define         Pin33                     (33)  //Analog input 3 of your arduino
/***********************Software Related Macros************************************/
#define         Type                    ("MQ-2") //MQ2
#define         Voltage_Resolution      (3.3)
#define         ADC_Bit_Resolution      (12) // For arduino UNO/MEGA/NANO
#define         RatioMQ2CleanAir        (9.83) //RS / R0 = 9.83 ppm 



// Timer variables (send new readings every 30 secs)
unsigned long lastTime = 0;
unsigned long timerDelay = 500;

//Too get time from this server
const char* ntpServer = "pool.ntp.org";


/*****************************Globals***********************************************/
MQUnifiedsensor MQ2(Board, Voltage_Resolution, ADC_Bit_Resolution, Pin33, Type);
/*****************************Globals***********************************************/

// Initialize WiFi
void initWiFi() {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi ..");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
  }
  Serial.println(WiFi.localIP());
  Serial.println();
}

// Gets time so that we can see when the data is read
unsigned long getTime() {
  time_t now;
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    Serial.println("Failed to obtain time");
    return(0);
  }
  time(&now);
  return now;
}


String readGasH2(){
   MQ2.update();
   MQ2.setA(987.99); MQ2.setB(-2.162);
   float H2 = MQ2.readSensor();
   if (isnan(H2)){
   Serial.println("Failed to read from MQ2 H2 gas");
   return "";
   }else{
    Serial.println(H2);
    return String(H2);
   }
}

String readGasLPG(){
   MQ2.update();
   MQ2.setA(574.25); MQ2.setB(-2.222);
   float LPG = MQ2.readSensor();
   if (isnan(LPG)){
   Serial.println("Failed to read from MQ2 LPG gas");
   return "";
   }else{
    Serial.println(LPG);
    return String(LPG);
   }
}

String readGasCO(){
   MQ2.update();
   MQ2.setA(36974); MQ2.setB(-3.109);
   float CO = MQ2.readSensor();
   if (isnan(CO)){
   Serial.println("Failed to read from MQ2 CO gas");
   return "";
   }else{
    Serial.println(CO);
    return String(CO);
   }
}

String readGasAlcohol(){
   MQ2.update();
   MQ2.setA(3616.1); MQ2.setB(-2.675);
   float Alcohol = MQ2.readSensor();
   if (isnan(Alcohol)){
   Serial.println("Failed to read from MQ2 Alcohol gas");
   return "";
   }else{
    Serial.println(Alcohol);
    return String(Alcohol);
   }
}

String readGasPropane(){
   MQ2.update();
   MQ2.setA(658.71); MQ2.setB(-2.168);
   float Propane = MQ2.readSensor();
   if (isnan(Propane)){
   Serial.println("Failed to read from MQ2 Propane gas");
   return "";
   }else{
    Serial.println(Propane);
    return String(Propane);
   }
}



void setup(){
  Serial.begin(115200); //Init serial port
  initWiFi();
  configTime(0, 0, ntpServer);
  MQ2.init(); 
  MQ2.setRegressionMethod(1); //_PPM =  a*ratio^b

  /*****************************  MQ CAlibration ********************************************/ 
  // Explanation: 
   // In this routine the sensor will measure the resistance of the sensor supposedly before being pre-heated
  // and on clean air (Calibration conditions), setting up R0 value.
  // We recomend executing this routine only on setup in laboratory conditions.
  // This routine does not need to be executed on each restart, you can load your R0 value from eeprom.
  // Acknowledgements: https://jayconsystems.com/blog/understanding-a-gas-sensor
  Serial.print("Calibrating please wait.");
  float calcR0 = 0;
  for(int i = 1; i<=10; i ++)
  {
    MQ2.update(); // Update data, the arduino will read the voltage from the analog pin
    calcR0 += MQ2.calibrate(RatioMQ2CleanAir);
    Serial.print(".");
  }
  MQ2.setR0(calcR0/10);
  Serial.println("  done!.");
  
  if(isinf(calcR0)) {Serial.println("Warning: Conection issue, R0 is infinite (Open circuit detected) please check your wiring and supply"); while(1);}
  if(calcR0 == 0){Serial.println("Warning: Conection issue found, R0 is zero (Analog pin shorts to ground) please check your wiring and supply"); while(1);}
  /*****************************  MQ CAlibration ********************************************/ 


 
  // Assign the api key (required)
  config.api_key = API_KEY;

  // Assign the user sign in credentials
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;

  // Assign the RTDB URL (required)
  config.database_url = DATABASE_URL;



  // Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h

  // Assign the maximum retry of token generation
  config.max_token_generation_retry = 5;

  // Initialize the library with the Firebase authen and config
  Firebase.begin(&config, &auth);

  // Getting the user UID might take a few seconds
  Serial.println("Getting User UID");
  while ((auth.token.uid) == "") {
    Serial.print('.');
    delay(1000);
  }
  // Print user UID
  uid = auth.token.uid.c_str();
  Serial.print("User UID: ");
  Serial.println(uid);

    // Update database path
  databasePath = "/UsersData/" + uid + "/readings";
 
}

void loop() {
    if (Firebase.ready() && (millis() - lastTime) > timerDelay || lastTime == 0) {
    // Send Events to the client with the Sensor Readings Every 500 milis seconds
     lastTime = millis();
    
   
   

    timestamp = getTime();
    Serial.print ("time: ");
    Serial.println (timestamp);

    parentPath= databasePath + "/" + String(timestamp);
    

   
    json.set(MQ2_H2Path.c_str(),readGasH2());
    json.set(MQ2_AlcPath.c_str(),readGasAlcohol());
    json.set(MQ2_PropPath.c_str(),readGasPropane());
    json.set(MQ2_LPGPath.c_str(),readGasLPG());
    json.set(MQ2_COPath.c_str(),readGasCO());
    json.set(timePath, String(timestamp));
  


    Serial.printf("Set json... %s\n", Firebase.RTDB.setJSON(&fbdo, parentPath.c_str(), &json) ? "ok" : fbdo.errorReason().c_str());


    }
  }
  
