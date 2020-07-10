import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateAvatarUser = container.resolve(UpdateUserAvatarService);

    const user = await updateAvatarUser.run({
      user_id: req.user.id,
      avatarFileName: req.file.filename,
    });

    return res.status(201).json(classToClass(user));
  }
}
