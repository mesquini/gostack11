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
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 20, 8, 0, 0),
      user_id: 'user',
    });

    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 20, 10, 0, 0),
      user_id: 'user',
    });

    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 21, 10, 0, 0),
      user_id: 'user',
    });

    const availability = await listProviderMonthAvailability.run({
      provider_id: 'user',
      year: 2020,
      month: 5,
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
          available: false,
        },
        {
          day: 22,
          available: true,
        },
      ]),
    );
  });
});
