import CreateUsersService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/Fake/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUsers = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUsers.run({
      email: 'jonhdoe@example.com',
      password: '123123',
      name: 'John Doe',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUsers = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUsers.run({
      email: 'jonhdoe@example.com',
      password: '123123',
      name: 'John Doe',
    });

    expect(
      createUsers.run({
        email: 'jonhdoe@example.com',
        password: '123123',
        name: 'John Doe',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
