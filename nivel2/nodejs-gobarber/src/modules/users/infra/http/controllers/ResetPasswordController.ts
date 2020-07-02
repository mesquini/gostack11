import { Request, Response } from 'express';

import { container } from 'tsyringe';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';

export default class SessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { password, token } = req.body;

    const resetPasswordService = container.resolve(ResetPasswordService);

    await resetPasswordService.run({ token, password });

    return res.status(204).json({});
  }
}
