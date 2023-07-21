import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateFileDto,
  FileDocumentModelType,
  FilesEntity,
  FileType,
} from '../entity/files.entity';

export class FileViewDto {
  constructor(model) {
    //TODO: fix incorrect mapping
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
export class FilesService {
  constructor(
    @InjectModel(FilesEntity.name)
    private readonly FileDocumentModel: FileDocumentModelType,
  ) {}

  async createFile(dto: CreateFileDto): Promise<string> {
    const newFile = this.FileDocumentModel.initialize(dto);

    await newFile.save();

    return newFile._id.toString();
  }

  async getFileById(id: string): Promise<FileViewDto | null> {
    console.log('get file by id');
    const result = await this.FileDocumentModel.findOne({
      _id: id,
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

  async getFilesByIds(ids: string[]): Promise<FileViewDto[]> {
    console.log('get file by ids');
    const result = await this.FileDocumentModel.find({
      _id: ids,
    }).lean();

    return result.map((result) => new FileViewDto(result));
  }
}
