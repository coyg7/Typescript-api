import { Router } from 'express';
import homeController from './controllers/homeController';
import userController from './controllers/userController';
import { uniqueEmail, userExists } from './validators/userValidator';

const router = Router();

router.use('/', homeController);

router.use('/users', userController);

// router.get('/users', userController.index);
// router.get('/users/:id', userController.show);
// router.post('/register', uniqueEmail, userController.register);
// router.put('/users/:id', userExists, userController.update);
// router.delete('/users/:id', userExists, userController.remove);

export default router;
