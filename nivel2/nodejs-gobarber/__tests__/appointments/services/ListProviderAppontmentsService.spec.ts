import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

import FakeAppointmentRepository from '../repositories/fake/FakeAppointmentRepository';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListProviderAppontmentsService', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();

    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentRepository,
    );
  });

  it('should be able to list the appointments on a specific day and provider', async () => {
    const appointment1 = await fakeAppointmentRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 6, 20, 12, 0, 0),
      user_id: 'user',
    });

    const appointment2 = await fakeAppointmentRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 6, 20, 17, 0, 0),
      user_id: 'user',
    });

    const appointments = await listProviderAppointmentsService.run({
      provider_id: 'provider',
      day: 20,
      month: 7,
      year: 2020,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
