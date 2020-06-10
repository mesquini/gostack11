import { Router } from 'express';

import AuthUserService from '../services/AuthUserService';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (req, res) => {
  const { email, password } = req.body;

  const authUser = new AuthUserService();

  const { user, token } = await authUser.run({ email, password });

  return res.status(201).json({ user, token });
});

export default sessionsRoutes;
