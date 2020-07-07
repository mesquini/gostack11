import ShowProfileService from '@modules/users/services/ShowProfileService';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able show the profile', async () => {
    const user = await fakeUsersRepository.create({
      email: 'jonhdoe@example.com',
      password: '123123',
      name: 'John Doe',
    });

    const updatedUser = await showProfile.run({
      user_id: user.id,
    });

    expect(updatedUser.name).toBe('John Doe');
    expect(updatedUser.email).toBe('jonhdoe@example.com');
  });

  it('should not be able show the profile from non-existing user', async () => {
    await expect(
      showProfile.run({
        user_id: 'user.id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
