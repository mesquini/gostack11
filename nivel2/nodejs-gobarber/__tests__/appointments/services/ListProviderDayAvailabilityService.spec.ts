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
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 20, 12, 0, 0),
      user_id: 'user',
    });

    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 20, 17, 0, 0),
      user_id: 'user',
    });

    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 20, 15, 0, 0),
      user_id: 'user',
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 7, 11).getTime();
    });

    const availability = await listProviderDayAvailability.run({
      provider_id: 'user',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        {
          hour: 8,
          available: false,
        },
        {
          hour: 9,
          available: false,
        },
        {
          hour: 12,
          available: false,
        },
        {
          hour: 13,
          available: true,
        },
        {
          hour: 10,
          available: false,
        },
        {
          hour: 15,
          available: false,
        },
      ]),
    );
  });
});
