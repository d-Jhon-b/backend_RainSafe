import { Get, Route, Controller, Tags } from "tsoa";
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
}