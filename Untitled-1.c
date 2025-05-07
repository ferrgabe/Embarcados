// HC-SR04 com LED de alerta (distância < 10 cm)

const int trigPin = 12;  // D6 = GPIO12
const int echoPin = 14;  // D5 = GPIO14
const int ledPin = 13;   // D7 = GPIO13 (LED de alerta)

// Velocidade do som em cm/us
#define SOUND_VELOCITY 0.034
#define CM_TO_INCH 0.393701

long duration;
float distanceCm;
float distanceInch;

void setup() {
  Serial.begin(115200);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(ledPin, OUTPUT); // LED como saída
}

void loop() {
  // Pulso no TRIG
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Tempo de resposta do ECHO
  duration = pulseIn(echoPin, HIGH);

  // Distância em cm e polegadas
  distanceCm = duration * SOUND_VELOCITY / 2;
  distanceInch = distanceCm * CM_TO_INCH;

  // Exibe no serial monitor
  Serial.print("Distância (cm): ");
  Serial.println(distanceCm);

  // Acende o LED se estiver a menos de 10 cm
  if (distanceCm > 0 && distanceCm < 10) {
    // GET ou POST aqui
    digitalWrite(ledPin, LOW); // Liga LED
    Serial.print("Distância (Testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee): ");
  } else {
    digitalWrite(ledPin, HIGH);  // Desliga LED
  }

  delay(1000); // Atualiza a cada meio segundo
}