import { Router } from 'express';
import { getMapById, createMap, updateMap } from '../controllers/mapController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.get('/:id', getMapById);

router.post('/', authMiddleware, createMap);
router.put('/:id', authMiddleware, updateMap);

export default router;