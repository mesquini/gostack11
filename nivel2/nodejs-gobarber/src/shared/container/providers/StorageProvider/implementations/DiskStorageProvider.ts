import fs from 'fs';
import path from 'path';

import uploadConfig from '@configs/upload';
import IStorageProvider from '../models/IStorageProvider';
import ISaveFileDTO from '../dtos/ISaveFileDTO';

export default class DiskStorageProvider implements IStorageProvider {
  async saveFile({ file }: ISaveFileDTO): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file.avatarFileName),
      path.resolve(uploadConfig.uploadsFolder, file.avatarFileName),
    );

    return file.avatarFileName;
  }

  async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
