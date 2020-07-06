import CreateUsersService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/Fake/FakeHashProvider';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let createUsers: CreateUsersService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUsers = new CreateUsersService(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await createUsers.run({
      email: 'jonhdoe@example.com',
      password: '123123',
      name: 'John Doe',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUsers.run({
      email: 'jonhdoe@example.com',
      password: '123123',
      name: 'John Doe',
    });

    await expect(
      createUsers.run({
        email: 'jonhdoe@example.com',
        password: '123123',
        name: 'John Doe',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
