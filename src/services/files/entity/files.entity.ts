/*import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument} from 'mongoose';*/

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectId } from 'mongodb';

export enum FileType {
  Img = 'IMG',
  Text = 'TEXT',
}

export class CreateFileDto {
  constructor(model: CreateFileDto) {
    Object.assign(this, model);
  }
  type: FileType;
  isPrivate: boolean;
}

@Schema({ collection: 'users' })
export class FilesEntity {
  @Prop({ required: true })
  _id: ObjectId;

  @Prop({ required: true, enum: FileType })
  type: FileType;

  @Prop({ required: true })
  fileName: string;

  @Prop({ required: true })
  ext: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  isPrivate: boolean;

  initialize(dto: CreateFileDto) {
    this.createdAt = new Date();
    this.isPrivate = dto.isPrivate;
    this.type = dto.type;
    this.ext = dto.type === FileType.Img ? 'jpg' : 'txt';
    this.fileName = `${
      this.isPrivate ? 'private-file-name' : 'public-file-name'
    }_${this._id.toString().slice(3, 8)}`;
    this.url = `https://some-storage/files/${this.fileName}.${this.ext}`;
  }
}

export const FileSchema = SchemaFactory.createForClass(FilesEntity);

FileSchema.methods = {
  initialize: FilesEntity.prototype.initialize,
};

export type FileDocument = HydratedDocument<FilesEntity>;
