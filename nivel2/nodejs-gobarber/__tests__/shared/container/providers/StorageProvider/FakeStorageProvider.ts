import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ISaveFileDTO from '@shared/container/providers/StorageProvider/dtos/ISaveFileDTO';

export default class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  async saveFile({ file }: ISaveFileDTO): Promise<string> {
    this.storage.push(file.avatarFileName);

    return file.avatarFileName;
  }

  async deleteFile(file: string): Promise<void> {
    const findIndex = this.storage.findIndex(
      storageFile => storageFile === file,
    );

    this.storage.splice(findIndex, 1);
  }
}
