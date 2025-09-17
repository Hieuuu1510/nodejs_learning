import { Router } from 'express';
import CourseController from '../app/controllers/CourseController.js';

const router = Router();

router.post('/store', CourseController.postStore);
router.get('/create', CourseController.create);
router.get('/:id/edit', CourseController.edit);
router.put('/:id', CourseController.updateCourse);
router.patch('/:id/restore', CourseController.restoreCourse);
router.delete('/:id/force', CourseController.restoreForce);
router.delete('/:id', CourseController.deleteCourse);
router.get('/:slug', CourseController.slug);

export default router;
