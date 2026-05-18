import { Get, Route, Controller, Tags,Path, Post,Body } from "tsoa";
import { SensorController } from "../controller/SensorController";
import { SensorReadout } from "../interfaces/SensorReadout";
import { Device } from "../interfaces/Devices";


@Route("rainsafe")
@Tags("Monitoramento")
export class SensorRouter extends Controller {
  private controller: SensorController;

  constructor() {
    super();
    this.controller = new SensorController();
  }

  @Get("historico")
  public async getHistorico(): Promise<SensorReadout[]> {
    return await this.controller.handleGetHistory();
  }
  @Get("sensor/{id}")
  public async getLatest(@Path() id: string): Promise<SensorReadout | null> {
    const result = await this.controller.getLatestBySensorId(id);
    if (!result) {
      this.setStatus(404);
      return null;
    }
    return result;
  }
  
  @Post("dispositivos")
  public async addDevice(@Body() requestBody: Device): Promise<void> {
    this.setStatus(201); // Created
    await this.controller.registerDevice(requestBody);
  }
  @Get("dispositivos")
  public async listDevices(): Promise<Device[]> {
    return await this.controller.getManyDevice();
  }


}