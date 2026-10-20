import './config/env';
import express, {Application, Request, Response} from "express" ;
import carRoutes from './routes/cars';
import { authenticateKey } from './middleware/auth.middleware';
import { logRequest } from "./middleware/logger.middleware";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import { errorHandler } from "./middleware/error.middleware";

console.log('Before Express:', process.env.NODE_ENV);

const app: Application = express();


console.log('Express environment:', app.get('env'));

app.use(express.json());

// temp
app.get("/pong", (_req: Request, _res: Response) => {
    console.log("Received request to /pong");
    throw new Error("Simulated error in /pong route");
});

app.get("/pung", async (_req: Request, _res: Response) => {
    console.log("Received request to /pung");
    throw new Error("Simulated error in /pung route");
});

app.use(logRequest);

// Routes
app.get("/ping", async (_req : Request, res: Response) => {
    res.json({
    message: "hello from Una"
    });
});

app.get('/bananas', async (_req : Request, res: Response) => {
    res.json({
    message: "this is bananas",
    });
});

app.use('/api/v1/cars', authenticateKey, carRoutes);

app.use(errorHandler);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

export { app };


    
