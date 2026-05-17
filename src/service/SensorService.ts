import { db } from "../config/database";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { SensorReadout } from "../interfaces/SensorReadout";

export class SensorService {
  public async getRecentHistory(): Promise<SensorReadout[]> {
    const sensorCol = collection(db, "historico_sensores");
    const q = query(sensorCol, orderBy("timestamp", "desc"), limit(10));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => doc.data() as SensorReadout);
  }
}



// import { db } from "../config/database";
// import { collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";
// import { SensorReadout } from "../interfaces/SensorReadout";

// export class SensorService {
//     public async getHistory(): Promise<SensorReadout[]> {
//         const colRef = collection(db, "historico_sensores");
//         const q = query(colRef, orderBy("timestamp", "desc"), limit(10));
//         const snapshot = await getDocs(q);

//         return snapshot.docs.map(doc => doc.data() as SensorReadout);
//     }
    
//   public async saveReadout(data: SensorReadout): Promise<void> {
//     const sensorCollection = collection(db, "historico_sensores");
//     await addDoc(sensorCollection, { ...data, timestamp: new Date() });
//     console.log(`[Service] Dados salvos: ${data.sensor_id}`);
//   }


//   public async getLastReadouts(): Promise<SensorReadout[]> {
//     const sensorCollection = collection(db, "historico_sensores");
//     const q = query(sensorCollection, orderBy("timestamp", "desc"), limit(10));
//     const querySnapshot = await getDocs(q);
    
//     return querySnapshot.docs.map(doc => doc.data() as SensorReadout);
//   }
// }