import { db } from "../config/database";
import { collection, addDoc } from "firebase/firestore";

import { SensorReadout } from "../interfaces/SensorReadout";

export const salvarDadosSensor = async (dados: SensorReadout): Promise<void> => {
  try {

    const sensorCollectionRef = collection(db, "historico_sensores");
    console.log(sensorCollectionRef)
    const docRef = await addDoc(sensorCollectionRef, {
      ...dados,
      timestamp: dados.timestamp || new Date() 
    });

    console.log(`[Firebase] Dados salvos com sucesso! ID do documento: ${docRef.id}`);
  } catch (error) {
    console.error("[Firebase] Erro ao salvar dados no Firestore:", error);
    throw error;
  }
};