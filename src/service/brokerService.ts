import { db } from "../config/database";
import { collection, addDoc } from "firebase/firestore";



export interface SensorPayload {
  sensor_id: string;
  temperatura: number;
  umidade: number;
  status_chuva: string; // Ajustado para evitar espaços na chave
  timestamp: Date;
}

export const salvarDadosSensor = async (dados: SensorPayload): Promise<void> => {
  try {
    // Define a coleção no Firestore onde os logs serão salvos
    // Como é uma série temporal (dados chegando do broker), criamos uma coleção geral de histórico
    const sensorCollectionRef = collection(db, "historico_sensores");
    console.log(sensorCollectionRef)
    // Adiciona o documento. O Firestore gera um ID único automaticamente
    const docRef = await addDoc(sensorCollectionRef, {
      ...dados,
      // É uma boa prática converter a data para o formato de Timestamp do Firebase
      timestamp: dados.timestamp || new Date() 
    });

    console.log(`[Firebase] Dados salvos com sucesso! ID do documento: ${docRef.id}`);
  } catch (error) {
    console.error("[Firebase] Erro ao salvar dados no Firestore:", error);
    throw error;
  }
};