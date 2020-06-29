import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppoitmentService';

export default class AppointmentController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { provider_id, date } = req.body;
    const parsedDate = parseISO(date);

    const createAppoitment = container.resolve(CreateAppointmentService);

    const appointment = await createAppoitment.run({
      date: parsedDate,
      provider_id,
    });

    return res.json(appointment);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    // const appointments = await appointmentsRepository.find();

    return res.json({ message: true });
  }
}
