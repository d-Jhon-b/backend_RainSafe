import { SensorService } from "../service/SensorService";
import { SensorReadout } from "../interfaces/SensorReadout";

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
}