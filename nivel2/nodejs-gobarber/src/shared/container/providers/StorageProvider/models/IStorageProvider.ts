import ISaveFileDTO from '../dtos/ISaveFileDTO';

export default interface IStorageProvider {
  saveFile(data: ISaveFileDTO): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
