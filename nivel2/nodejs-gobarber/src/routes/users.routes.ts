import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../configs/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import auth from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();
const upload = multer(uploadConfig);

usersRoutes.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const createUser = new CreateUserService();

  const user = await createUser.run({ name, email, password });

  delete user.password;

  return res.status(201).json(user);
});

usersRoutes.patch(
  '/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    const updateAvatarUser = new UpdateUserAvatarService();

    const user = await updateAvatarUser.run({
      user_id: req.user.id,
      avatarFileName: req.file.filename,
    });

    delete user.password;

    return res.status(201).json(user);
  },
);

export default usersRoutes;
