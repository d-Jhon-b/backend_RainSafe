import { db } from "../config/database";
import { collection, getDocs, query, orderBy, limit, where,doc, setDoc } from "firebase/firestore";
import { SensorReadout } from "../interfaces/SensorReadout";
import type { Device } from "../interfaces/Devices";
export class SensorService {
  public async getRecentHistory(): Promise<SensorReadout[]> {
    const sensorCol = collection(db, "historico_sensores");
    const q = query(sensorCol, orderBy("timestamp", "desc"), limit(10));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => doc.data() as SensorReadout);
  }
  public async fetchLatestReading(sensorId: string): Promise<SensorReadout | null> {
    const sensorCol = collection(db, "historico_sensores");
    const q = query(
      sensorCol,
      where("sensor_id", "==", sensorId),
      orderBy("timestamp", "desc"),
      limit(1)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    const data = doc.data();
    return {
      ...data,
      timestamp: data.timestamp.toDate() // Converte Timestamp do Firebase para Date do JS
    } as SensorReadout;
  }

  public async registerDevice(device: Device): Promise<void> {
    const deviceRef = doc(db, "dispositivos", device.sensor_id);
    await setDoc(deviceRef, {
      ...device,
      createdAt: new Date()
    });
  }

  public async getAllDevices(): Promise<Device[]> {
    const col = collection(db, "dispositivos");
    const snapshot = await getDocs(col);
    return snapshot.docs.map(doc => doc.data() as Device);
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