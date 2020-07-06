import AppError from '@shared/errors/AppError';

import CreateUsersService from '@modules/users/services/CreateUserService';
import AuthUserService from '@modules/users/services/AuthUserService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/Fake/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUsers: CreateUsersService;
let authUserService: AuthUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUsers = new CreateUsersService(fakeUsersRepository, fakeHashProvider);
    authUserService = new AuthUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to authenticate', async () => {
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
    await expect(
      authUserService.run({
        email: 'jonhdoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createUsers.run({
      email: 'jonhdoe@example.com',
      password: '123123',
      name: 'John Doe',
    });

    await expect(
      authUserService.run({
        email: 'jonhdoe@example.com',
        password: '223123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
