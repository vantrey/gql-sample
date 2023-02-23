import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateFileDto,
  FileDocument,
  FilesEntity,
  FileType,
} from '../entity/files.entity';
import { ObjectId } from 'mongodb';

export class FileViewDto {
  constructor(model) {
    Object.assign(this, model);
    this.id = model._id.toString();
  }
  id: string;
  type: FileType;
  fileName: string;
  ext: string;
  url: string;
  createdAt: Date;
  isPrivate: boolean;
}

@Injectable()
export class FilesServiceAdapter {
  constructor(
    @InjectModel(FilesEntity.name)
    private readonly FileDocumentModel: Model<FileDocument>,
  ) {}

  async createFile(dto: CreateFileDto): Promise<string> {
    const newFile = new this.FileDocumentModel();

    newFile.initialize(dto);
    await newFile.save();

    return newFile._id.toString();
  }

  async getFileById(id: string): Promise<FileViewDto> {
    const result = await this.FileDocumentModel.findOne({
      _id: new ObjectId(id),
    }).lean();

    if (!result) {
      return null;
    }

    return new FileViewDto(result);
  }

  async getFiles(): Promise<FileViewDto[]> {
    const result = await this.FileDocumentModel.find({}).lean();

    return result.map((result) => new FileViewDto(result));
  }

  async getUsersByIds(ids: string[]): Promise<FileViewDto[]> {
    const objectIds = ids.map((id) => new ObjectId(id));
    const result = await this.FileDocumentModel.find({
      _id: objectIds,
    }).lean();

    return result.map((result) => new FileViewDto(result));
  }
}
