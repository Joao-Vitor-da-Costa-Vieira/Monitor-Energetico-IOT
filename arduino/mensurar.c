#include <SPI.h>
#include <Ethernet.h>
#include <SSLClient.h>
#include "EmonLib.h"
#include "trust_anchor.h"

EnergyMonitor SCT013;
EthernetClient baseClient;
SSLClient client(baseClient, TAs, (size_t)TAs_NUM, A5);

byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
const char server[] = "[Seu dominio]";

int pinSCT = A0;
int tensao = 127;
int potencia;

void lerResposta() {
    unsigned long timeout = millis();
    while (client.connected()) {
        while (client.available()) {
            char c = client.read();
            Serial.write(c);
            timeout = millis();
        }
        if (millis() - timeout > 3000) break;
    }
    Serial.println();
}

void fazerLogin() {
    String body =
        "{\"email\":\"[Seu Login]\","
        "\"pass\":\"[Sua senha]\"}";

    if (client.connect(server, 443)) {
        client.println("PUT /login/LoginAsUser HTTP/1.1");
        client.print("Host: "); client.println(server);
        client.println("Content-Type: application/json");
        client.println("Connection: close");
        client.print("Content-Length: "); client.println(body.length());
        client.println();
        client.println(body);
        lerResposta();
        client.stop();
        Serial.println("Login realizado.");
    } else {
        Serial.println("Falha no login.");
    }
}

void enviarMedicao(double corrente, double potencia) {
    String body =
        "{\"current\":" + String(corrente, 2) +
        ",\"power\":" + String(potencia, 2) + "}";

    if (client.connect(server, 443)) {
        client.println("POST /device/ HTTP/1.1");
        client.print("Host: "); client.println(server);
        client.println("Content-Type: application/json");
        client.println("Connection: close");
        client.print("Content-Length: "); client.println(body.length());
        client.println();
        client.println(body);
        lerResposta();
        client.stop();
        Serial.println("Medicao enviada.");
    } else {
        Serial.println("Falha ao enviar medicao.");
    }
}

void setup()
{
    SCT013.current(pinSCT, 6.0606);

    Serial.begin(9600);

    Ethernet.begin(mac);
    delay(2000);
    Serial.print("IP: ");
    Serial.println(Ethernet.localIP());

    fazerLogin();
}

void loop()
{
    double Irms = SCT013.calcIrms(1480);

    potencia = Irms * tensao;

    Serial.print("Corrente = ");
    Serial.print(Irms);
    Serial.println(" A");

    Serial.print("Potencia = ");
    Serial.print(potencia);
    Serial.println(" W");

    enviarMedicao(Irms, potencia);

    delay(10000);
}