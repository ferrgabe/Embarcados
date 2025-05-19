#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>

// Substitua com suas credenciais de Wi-Fi
const char* ssid = "ROBERTO";
const char* password = "zzzzxxxx";

// Cria uma instância do servidor na porta 80
ESP8266WebServer server(80);

// Define os pinos conectados aos LEDs
const int redPin = D1;
const int greenPin = D2;
const int bluePin = D3;

void handlePost() {
  if (server.hasArg("plain") == false) {
    server.send(400, "application/json", "{\"error\":\"Corpo da requisição ausente\"}");
    return;
  }

  String body = server.arg("plain");
  StaticJsonDocument<200> doc;
  DeserializationError error = deserializeJson(doc, body);

  if (error) {
    server.send(400, "application/json", "{\"error\":\"JSON inválido\"}");
    return;
  }

  bool on = doc["ON"];
  bool red = doc["RED"];
  bool green = doc["GREEN"];
  bool blue = doc["BLUE"];
  int behavior = doc["BEHAVIOR"];

  if (on) {
    analogWrite(redPin, red);
    analogWrite(greenPin, green);
    analogWrite(bluePin, blue);
  } else {
    analogWrite(redPin, 0);
    analogWrite(greenPin, 0);
    analogWrite(bluePin, 0);
  }

  // Aqui você pode implementar diferentes comportamentos com base na variável 'behavior'

  server.send(200, "application/json", "{\"status\":\"LED atualizado\"}");
}

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  Serial.print("Conectando-se ao Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConectado ao Wi-Fi");

  // Configura os pinos como saída
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);

  // Define a rota POST
  server.on("/led", HTTP_POST, handlePost);

  // Inicia o servidor
  server.begin();
  Serial.println("Servidor HTTP iniciado");
}

void loop() {
  server.handleClient();
}