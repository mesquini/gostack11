import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '../../shared/container/providers/StorageProvider/FakeStorageProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to add a new avatar', async () => {
    const user = await fakeUsersRepository.create({
      email: 'jonhdoe@example.com',
      password: '123123',
      name: 'John Doe',
    });

    await updateUserAvatar.run({
      user_id: user.id,
      file: {
        avatarFileName: 'avatar.jpg',
        contentType: 'image/jpg',
      },
    });

    expect(user.avatar).toBe('avatar.jpg');
  });
  it('should not be able to add avatar from non existing user', async () => {
    await expect(
      updateUserAvatar.run({
        user_id: 'user-not-found',
        file: {
          avatarFileName: 'avatar.jpg',
          contentType: 'image/jpg',
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      email: 'jonhdoe@example.com',
      password: '123123',
      name: 'John Doe',
    });

    await updateUserAvatar.run({
      user_id: user.id,
      file: {
        avatarFileName: 'avatar.jpg',
        contentType: 'image/jpg',
      },
    });

    await updateUserAvatar.run({
      user_id: user.id,
      file: {
        avatarFileName: 'avatar2.jpg',
        contentType: 'image/jpg',
      },
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

    expect(user.avatar).toBe('avatar2.jpg');
  });
});
