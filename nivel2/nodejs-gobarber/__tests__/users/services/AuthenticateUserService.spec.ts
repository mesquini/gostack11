import AppError from '@shared/errors/AppError';

import CreateUsersService from '@modules/users/services/CreateUserService';
import AuthUserService from '@modules/users/services/AuthUserService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/Fake/FakeHashProvider';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUsers = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authUserService = new AuthUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUsers.run({
      email: 'jonhdoe@example.com',
      password: '123123',
      name: 'John Doe',
    });

    const response = await authUserService.run({
      email: 'jonhdoe@example.com',
      password: '123123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authUserService = new AuthUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      authUserService.run({
        email: 'jonhdoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUsers = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authUserService = new AuthUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUsers.run({
      email: 'jonhdoe@example.com',
      password: '123123',
      name: 'John Doe',
    });

    expect(
      authUserService.run({
        email: 'jonhdoe@example.com',
        password: '223123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
