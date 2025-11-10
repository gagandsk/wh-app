import 'reflect-metadata';
import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as cors from 'cors';

import { AppDataSource } from './config/data-source'; 
import { UserController } from './users/user.controller';
import { errorHandler } from './middleware/error-handler';

const initializeDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log("✅ MySQL conectado exitosamente.");
    } catch (error) {
        console.error("❌ Error Al conectar a MySQL:", error);
        process.exit(1);
    }
}

const app = express();

// Middlewares
app.use(cors({ 
    origin: true,//'http://localhost:5173',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true 
})); 

app.use(express.json()); 
app.use('/api/users', UserController); 
app.use((req: Request, res: Response, next: NextFunction) => { 
    res.status(404).json({ message: 'Ruta no encontrada' });
});
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
initializeDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
    });
});