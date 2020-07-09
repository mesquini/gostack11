import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

import FakeAppointmentRepository from '../repositories/fake/FakeAppointmentRepository';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();

    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentRepository,
    );
  });

  it('should be able to list the day availability from providers', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 7, 8).getTime();
    });

    await fakeAppointmentRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 6, 20, 12, 0, 0),
      user_id: 'user',
    });

    await fakeAppointmentRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 6, 20, 16, 0, 0),
      user_id: 'user',
    });

    await fakeAppointmentRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 6, 20, 15, 0, 0),
      user_id: 'user',
    });

    const availability = await listProviderDayAvailability.run({
      provider_id: 'provider',
      day: 20,
      month: 7,
      year: 2020,
    });

    expect(availability).toEqual([
      { hour: 8, available: true },
      { hour: 9, available: true },
      { hour: 10, available: true },
      { hour: 11, available: true },
      { hour: 12, available: false },
      { hour: 13, available: true },
      { hour: 14, available: true },
      { hour: 15, available: false },
      { hour: 16, available: false },
      { hour: 17, available: true },
    ]);
  });
});
