import express from "express";
import * as dotenv from 'dotenv';

import { RainSafeBroker } from "./service/mqqtService";
import { RegisterRoutes } from "./routes/routes";

import swaggerUi from "swagger-ui-express";

dotenv.config();

async function bootstrap() {
  const app = express();
  app.use(express.json());

  const broker = new RainSafeBroker();
  broker.connect();

  app.use("/docs", swaggerUi.serve, async (_req: any, res: any) => {
    try {
      const swaggerDocument = await import("./routes/swagger.json");
      return res.send(swaggerUi.generateHTML(swaggerDocument));
    } catch (e) {
      return res.status(500).send("Swagger file not found. Run 'npm run build-tsoa' first.");
    }
  });
  
  RegisterRoutes(app);

  app.listen(process.env.PORT || 3000, () => {
    console.log("API RainSafe Modular inicializada!");
    console.log(`http://localhost:3000/docs`)
  });
}

bootstrap();