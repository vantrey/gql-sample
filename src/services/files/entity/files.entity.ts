import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

export enum FileType {
  Img = 'IMG',
  Text = 'TEXT',
}

export class CreateFileDto {
  type: FileType;
  isPrivate: boolean;
}

const statics = {
  initialize(dto: CreateFileDto): FileDocument {
    const ext = dto.type === FileType.Img ? 'jpg' : 'txt';

    const fileName = `${
      dto.isPrivate ? 'private-file-name' : 'public-file-name'
    }_${Date.now().toString().slice(3, 8)}`;

    const file = {
      createdAt: new Date(),
      isPrivate: dto.isPrivate,
      type: dto.type,
      ext,
      fileName,
      url: `https://some-storage/files/${fileName}.${ext}`,
    };

    return new this(file);
  },
};

@Schema({ collection: 'files', statics })
export class FilesEntity {
  @Prop({ enum: FileType, required: true })
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
}

export const FileSchema = SchemaFactory.createForClass(FilesEntity);

type FileDocument = HydratedDocument<FilesEntity>;

export type FileDocumentModelType = Model<FileDocument> & typeof statics;
