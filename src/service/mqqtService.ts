import { db } from "../config/database";
import { Firestore as store} from "firebase/firestore";
import { salvarDadosSensor} from "./brokerService";
import { SensorReadout } from "../interfaces/SensorReadout";
import mqtt, {MqttClient} from "mqtt";

export class RainSafeBroker {
  private client: MqttClient | null = null;
  private readonly topic: string;

  constructor() {
    this.topic = process.env.TOPIC_VALUE || "";
    
    if (!this.topic) {
      throw new Error("Tópico não definido no arquivo .env");
    }
  }

  public connect(): void {
    const mqttOptions: mqtt.IClientOptions | any= {
      host: process.env.HOST_BROKER,
      port: Number(process.env.PORT_MQQT),
      protocol: 'mqtts',
      username: process.env.USER_NAME,
      password: process.env.PASSWORD,
    };

    console.log("Iniciando conexão segura com o Broker...");
    this.client = mqtt.connect(mqttOptions);

    this.setupListeners();
  }

  private setupListeners(): void {
    if (!this.client) return;

    this.client.on("connect", () => {
      console.log("Conectado ao HiveMQ Cloud!");
      this.client?.subscribe(this.topic, (err) => {
        if (!err) {
          console.log(`Ouvindo o tópico: ${this.topic}`);
        }
      });
    });

    this.client.on("message", async (receivedTopic, message) => {
      await this.handleIncomingMessage(message);
    });

    this.client.on("error", (err) => {
      console.error("Erro no cliente MQTT:", err);
    });
  }

  private async handleIncomingMessage(message: Buffer): Promise<void> {
    try {
      const payloadRaw = JSON.parse(message.toString());

      const dadosParaSalvar: SensorReadout = {
        sensor_id: payloadRaw.sensor_id || "ESP32_WOKWI_AUTO",
        temperatura: payloadRaw.temp,
        umidade: payloadRaw.umid,
        status_chuva: payloadRaw.status,
        timestamp: new Date(),
      };

      // console.log("Nova leitura detectada:", dadosParaSalvar);

      await salvarDadosSensor(dadosParaSalvar);
      
    } catch (error) {
      console.error("Falha ao processar mensagem do sensor:", error);
    }
  }
}