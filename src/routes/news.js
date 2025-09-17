import { Router } from 'express';
import newController from '../app/controllers/NewController.js';

const router = Router();

router.get('/:slug', newController.slugNews);
router.get('/', newController.getAllNews);

export default router;
