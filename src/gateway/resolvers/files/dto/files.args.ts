import { ArgsType, Field, registerEnumType } from '@nestjs/graphql';
import { FileType } from '../../../../services/files/entity/files.entity';

registerEnumType(FileType, { name: 'FileType' });

@ArgsType()
export class AddFileArgs {
  @Field(() => FileType)
  type: FileType;

  @Field()
  isPrivate: boolean;
}
