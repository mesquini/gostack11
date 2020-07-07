import AppError from '@shared/errors/AppError';
import ListProviderService from '@modules/appointments/services/ListProviderService';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProviderService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProviderService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      email: 'jonhdoe@example.com',
      password: '123123',
      name: 'John Doe',
    });

    const user2 = await fakeUsersRepository.create({
      email: 'jonhdoe@example.com',
      password: '123123',
      name: 'John Tree',
    });

    const loggerUser = await fakeUsersRepository.create({
      email: 'jonhdoe@example.com',
      password: '123123',
      name: 'John Qaud',
    });

    const providers = await listProviders.run({
      except_user_id: loggerUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
