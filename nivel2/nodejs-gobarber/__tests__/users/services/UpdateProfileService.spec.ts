import AppError from '@shared/errors/AppError';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import FakeHashProvider from '../providers/HashProvider/Fake/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able update the profile', async () => {
    const user = await fakeUsersRepository.create({
      email: 'jonhdoe@example.com',
      password: '123123',
      name: 'John Doe',
    });

    const updatedUser = await updateProfile.run({
      user_id: user.id,
      name: 'Mesquini',
      email: 'mee@exemple.com',
    });

    expect(updatedUser.name).toBe('Mesquini');
    expect(updatedUser.email).toBe('mee@exemple.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jonhdoe@example.com',
      password: '123123',
    });

    const user = await fakeUsersRepository.create({
      name: 'Mesquini',
      email: 'test@example.com',
      password: '123123',
    });

    await expect(
      updateProfile.run({
        user_id: user.id,
        name: 'Mesquini',
        email: 'jonhdoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able update the profile from non-existing user', async () => {
    await expect(
      updateProfile.run({
        user_id: 'user.id',
        email: 'test@email.com',
        name: 'test',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'jonhdoe@example.com',
      password: '123123',
      name: 'John Doe',
    });

    const updatedUser = await updateProfile.run({
      user_id: user.id,
      name: 'Mesquini',
      email: 'mee@exemple.com',
      old_password: '123123',
      password: '321321',
    });

    expect(updatedUser.password).toBe('321321');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'jonhdoe@example.com',
      password: '123123',
      name: 'John Doe',
    });

    await expect(
      updateProfile.run({
        user_id: user.id,
        name: 'Mesquini',
        email: 'mee@exemple.com',
        password: '321321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password without wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'jonhdoe@example.com',
      password: '123123',
      name: 'John Doe',
    });

    await expect(
      updateProfile.run({
        user_id: user.id,
        name: 'Mesquini',
        email: 'mee@exemple.com',
        old_password: 'wrong-password',
        password: '321321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
