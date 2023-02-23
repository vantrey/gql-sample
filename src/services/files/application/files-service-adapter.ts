import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateFileDto, FileDocument, FilesEntity } from '../entity/files.entity';

@Injectable()
export class FilesServiceAdapter {
  constructor(
    @InjectModel(FilesEntity.name) private readonly FileDocumentModel: Model<FileDocument>,
  ) {}

  async createFile(dto: CreateFileDto): Promise<string> {
    const newFile = new this.FileDocumentModel();

    newFile.initialize(dto);
    await newFile.save();

    return newFile._id.toString();
  }
}
