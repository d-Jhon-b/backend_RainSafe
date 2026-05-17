import express from "express";
import * as dotenv from 'dotenv';

import { RainSafeBroker } from "./service/mqqtService";
import { RegisterRoutes } from "./routes/routes";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

dotenv.config();

async function bootstrap() {
  const app = express();

  const allowedOrigins = [
    "http://localhost:5173",           
    "http://localhost:3000",            
    "https://rainsafe-web.vercel.app"   
  ];

  const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Acesso negado pelo CORS: Origem não permitida."));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"]
  };
  app.use(cors(corsOptions));
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