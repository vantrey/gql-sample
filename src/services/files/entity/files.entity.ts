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

@Schema({ collection: 'files' })
export class FilesEntity {
  @Prop()
  _id: ObjectId;

  @Prop({ enum: FileType })
  type: FileType;

  @Prop()
  fileName: string;

  @Prop()
  ext: string;

  @Prop()
  url: string;

  @Prop()
  createdAt: Date;

  @Prop()
  isPrivate: boolean;

  initialize(dto: CreateFileDto) {
    this._id = new ObjectId();
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
