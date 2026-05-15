import { db } from "./config/database";
import { Firestore as store} from "firebase/firestore";
import { salvarDadosSensor, SensorPayload } from "./service/brokerService";


async function simularChegadaDeDados() {
  console.log("Simulando chegada de dados do broker...");

  const payloadFake: SensorPayload = {
    sensor_id: "ESP32_SALA_01",
    temperatura: 24.5,
    umidade: 62.0,
    status_chuva: "sem chuva",
    timestamp: new Date() // Data e hora atual
  };
  console.log(payloadFake)

  await salvarDadosSensor(payloadFake);
}

simularChegadaDeDados();