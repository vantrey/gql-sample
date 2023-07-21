import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { FileTypeEnum } from '../dto/files.args';

registerEnumType(FileTypeEnum, { name: 'FileTypeEnum' });

@ObjectType({ description: 'documents and images' })
export class FilesModel {
  @Field(() => Date)
  createdAt: Date;

  @Field()
  ext: string;

  @Field()
  fileName: string;

  @Field()
  id: string;

  @Field()
  isPrivate: boolean;

  @Field(() => FileTypeEnum)
  type: FileTypeEnum;

  @Field()
  url: string;
}
