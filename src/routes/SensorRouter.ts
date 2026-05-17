import { Get, Route, Controller, Tags,Path } from "tsoa";
import { SensorController } from "../controller/SensorController";
import { SensorReadout } from "../interfaces/SensorReadout";

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
  


}