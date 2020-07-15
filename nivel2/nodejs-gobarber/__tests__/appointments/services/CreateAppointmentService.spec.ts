import CreateAppointmentService from '@modules/appointments/services/CreateAppoitmentService';
import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fake/FakeAppointmentRepository';
import FakeNotificationRepository from '../../notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '../../shared/container/providers/CacheProvider/FakeCacheProvider';

let fakeAppointmentRepository: FakeAppointmentRepository;
let fakeNotificationRepository: FakeNotificationRepository;
let createAppointment: CreateAppointmentService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    fakeNotificationRepository = new FakeNotificationRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
      fakeNotificationRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appoitment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 10, 12).getTime();
    });

    const appointment = await createAppointment.run({
      date: new Date(2020, 6, 10, 13),
      provider_id: '123',
      user_id: '312',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 6, 29, 15);

    await createAppointment.run({
      date: appointmentDate,
      provider_id: '123',
      user_id: '312',
    });

    await expect(
      createAppointment.run({
        date: appointmentDate,
        provider_id: '133',
        user_id: '312',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 10, 12).getTime();
    });

    await expect(
      createAppointment.run({
        date: new Date(2020, 6, 10, 11),
        provider_id: '133',
        user_id: '312',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 10, 12).getTime();
    });

    await expect(
      createAppointment.run({
        date: new Date(2020, 6, 10, 13),
        provider_id: '123',
        user_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am and after 6pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 10, 12).getTime();
    });

    await expect(
      createAppointment.run({
        date: new Date(2020, 6, 10, 7),
        provider_id: '123',
        user_id: '312',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.run({
        date: new Date(2020, 6, 10, 18),
        provider_id: '123',
        user_id: '321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
