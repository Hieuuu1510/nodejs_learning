import { Router } from 'express';
import newController from '../app/controllers/NewController.js';


const router = Router();

router.use("/:slug", newController.slugNews);
router.use("/", newController.getAllNews);

export default router;