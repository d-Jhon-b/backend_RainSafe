import { SensorService } from "../service/SensorService";
import { SensorReadout } from "../interfaces/SensorReadout";
import type{ Device } from "../interfaces/Devices";
export class SensorController {
  private service: SensorService;
  constructor() {
    this.service = new SensorService();
  }
  public async handleGetHistory(): Promise<SensorReadout[]> {
    return await this.service.getRecentHistory();
  }


  public async getLatestBySensorId(id: string): Promise<SensorReadout | null> {
    return await this.service.fetchLatestReading(id);
  }


  public async registerDevice(device: Device): Promise<Device | any> {
    try{
      return await this.service.registerDevice(device);
    }catch(error){
      return {erro: error}
    }
  }


  public async getManyDevice(): Promise<Device[]> {
    return await this.service.getAllDevices();
  }
}