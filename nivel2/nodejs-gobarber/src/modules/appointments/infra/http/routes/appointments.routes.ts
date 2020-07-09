import { Router } from 'express';

import auth from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentController from '../controllers/AppointmentController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(auth);

appointmentsRouter.get('/me', providerAppointmentsController.index);

appointmentsRouter.post('/', appointmentController.create);

export default appointmentsRouter;
