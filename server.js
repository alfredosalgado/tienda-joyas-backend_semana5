// server.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import joyasRouter from './routes/joyas.routes.js';
import { reportarConsulta } from './middlewares/logger.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares generales
app.use(cors());
app.use(express.json());
// Middleware de reporte para cada consulta
app.use(reportarConsulta);

// Rutas
app.use('/', joyasRouter);

// Ruta para manejar endpoints no encontrados
app.get('*', (req, res) => {
    res.status(404).send('Esta ruta no existe');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`💎 Servidor "Tienda de Joyas" escuchando en http://localhost:${PORT}`);
});