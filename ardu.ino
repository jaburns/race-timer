
void setup () {
  Serial.begin (115200);
  pinMode (2, INPUT);
}

void loop () {
  if (digitalRead (2)) {
    Serial.println("");
    delay (2000);
  }
}
