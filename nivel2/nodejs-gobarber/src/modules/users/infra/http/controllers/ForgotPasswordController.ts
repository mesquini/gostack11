import { Request, Response } from 'express';

import { container } from 'tsyringe';
import SendForogtPasswordEmailService from '@modules/users/services/SendForogtPasswordEmailService';

export default class SessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendForogtPasswordEmailService = container.resolve(
      SendForogtPasswordEmailService,
    );

    await sendForogtPasswordEmailService.run({ email });

    return res.status(204).json({});
  }
}
