import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderService from '@modules/appointments/services/ListProviderService';

export default class AppointmentController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listProviders = container.resolve(ListProviderService);

    const providers = await listProviders.run({
      except_user_id: req.user.id,
    });

    return res.status(200).json(providers);
  }
}
