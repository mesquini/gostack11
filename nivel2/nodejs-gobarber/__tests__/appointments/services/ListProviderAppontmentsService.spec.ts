import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

import FakeAppointmentRepository from '../repositories/fake/FakeAppointmentRepository';
import FakeCacheProvider from '../../shared/container/providers/CacheProvider/FakeCacheProvider';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppontmentsService', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentRepository,
      fakeCacheProvider,
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
