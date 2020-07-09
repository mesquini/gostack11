import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

import FakeAppointmentRepository from '../repositories/fake/FakeAppointmentRepository';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();

    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentRepository,
    );
  });

  it('should be able to list the month availability from providers', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 7, 9).getTime();
    });

    await fakeAppointmentRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 6, 20, 8, 0, 0),
      user_id: 'user',
    });

    await fakeAppointmentRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 6, 20, 9, 0, 0),
      user_id: 'user',
    });

    await fakeAppointmentRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 6, 20, 10, 0, 0),
      user_id: 'user',
    });

    await fakeAppointmentRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 6, 20, 11, 0, 0),
      user_id: 'user',
    });

    await fakeAppointmentRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 6, 20, 12, 0, 0),
      user_id: 'user',
    });

    await fakeAppointmentRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 6, 20, 13, 0, 0),
      user_id: 'user',
    });

    await fakeAppointmentRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 6, 20, 14, 0, 0),
      user_id: 'user',
    });

    await fakeAppointmentRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 6, 20, 15, 0, 0),
      user_id: 'user',
    });

    await fakeAppointmentRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 6, 20, 16, 0, 0),
      user_id: 'user',
    });

    await fakeAppointmentRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 6, 20, 17, 0, 0),
      user_id: 'user',
    });

    await fakeAppointmentRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 6, 20, 18, 0, 0),
      user_id: 'user',
    });

    const availability = await listProviderMonthAvailability.run({
      provider_id: 'provider',
      year: 2020,
      month: 7,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        {
          day: 19,
          available: true,
        },
        {
          day: 20,
          available: false,
        },
        {
          day: 21,
          available: true,
        },
        {
          day: 22,
          available: true,
        },
      ]),
    );
  });
});
