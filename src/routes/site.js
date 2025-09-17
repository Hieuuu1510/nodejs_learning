import { Router } from 'express';
import SiteController from '../app/controllers/SiteController.js';

const router = Router();

router.get('/', SiteController.findMany);

export default router;
