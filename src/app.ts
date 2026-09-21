import express, {Application, Request, Response} from "express" ;
import carRoutes from './routes/cars';
import { env } from './config/env';
import { connectDB } from "./config/database";

const PORT = env.PORT || 3000;

const app: Application = express();

app.use(express.json());

app.use('/api/v1/cars', carRoutes);

// Middleware to log requests
app.use((req, _res, next) => {  
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

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

// Listen request
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

};

startServer();

    
