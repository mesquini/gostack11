import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateAvatarUser = container.resolve(UpdateUserAvatarService);

    const user = await updateAvatarUser.run({
      user_id: req.user.id,
      file: {
        avatarFileName: req.file.filename,
        contentType: req.file.mimetype,
      },
    });

    return res.status(201).json(classToClass(user));
  }
}
