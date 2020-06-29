import CreateAppointmentService from '@modules/appointments/services/CreateAppoitmentService';
import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fake/FakeAppointmentRepository';

describe('CreateAppointment', () => {
  it('should be able to create a new appoitment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

    const appointment = await createAppointment.run({
      date: new Date(),
      provider_id: '123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123');
  });

  it('should not be able to create two appoitments on the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

    const appointmentDate = new Date(2020, 6, 29, 18);

    await createAppointment.run({
      date: appointmentDate,
      provider_id: '123',
    });

    expect(
      createAppointment.run({
        date: appointmentDate,
        provider_id: '133',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
