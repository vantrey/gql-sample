import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { FileViewDto } from '../../../../services/files/application/files-service-adapter';
import { FileType } from '../../../../services/files/entity/files.entity';

registerEnumType(FileType, { name: 'FileType' });

@ObjectType({ description: 'documents and images' })
export class FilesModel implements FileViewDto {
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

  @Field(() => FileType)
  type: FileType;

  @Field()
  url: string;
}
