import { Router } from 'express';
import * as homeController from './controllers/homeController';
import * as userController from './controllers/userController';
import * as authController from './controllers/authController';
import { uniqueEmail, userExists } from './validators/userValidator';

const router = Router();
router.get('/', homeController.index);


router.get('/users', userController.index);
router.get('/users/:id', userController.show);
router.post('/register', uniqueEmail, userController.register);
router.put('/users/:id', userExists, userController.update);
router.delete('/users/:id', userExists, userController.remove);

export default router;
