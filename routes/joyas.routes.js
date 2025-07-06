// routes/joyas.routes.js
import { Router } from 'express';
import { getJoyasController, getJoyasByFilterController } from '../controllers/joyas.controller.js';

const router = Router();

router.get('/joyas', getJoyasController);
router.get('/joyas/filtros', getJoyasByFilterController);

export default router;