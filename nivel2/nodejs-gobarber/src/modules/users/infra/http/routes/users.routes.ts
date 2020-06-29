import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@configs/upload';

import auth from '../middlewares/ensureAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';
import UserController from '../controllers/UserController';

const usersRoutes = Router();
const upload = multer(uploadConfig);

const userAvatarController = new UserAvatarController();
const userController = new UserController();

usersRoutes.post('/', userController.create);

usersRoutes.patch(
  '/avatar',
  auth,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRoutes;
