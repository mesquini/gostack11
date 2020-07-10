import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';

import uploadConfig from '@configs/upload';
import IStorageProvider from '../models/IStorageProvider';
import ISaveFileDTO from '../dtos/ISaveFileDTO';

export default class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: process.env.AWS_REGION,
    });
  }

  public async saveFile({
    file: { avatarFileName, contentType },
  }: ISaveFileDTO): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, avatarFileName);

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: avatarFileName,
        ContentType: contentType,
        ACL: 'puplic-read',
        Body: fileContent,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return avatarFileName;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
      })
      .promise();
  }
}
