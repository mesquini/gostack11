import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@configs/upload';

import auth from '../middlewares/ensureAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';
import UserController from '../controllers/UserController';

const usersRoutes = Router();
const upload = multer(uploadConfig);

const userAvatarController = new UserAvatarController();
const userController = new UserController();

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);

usersRoutes.patch(
  '/avatar',
  auth,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRoutes;
