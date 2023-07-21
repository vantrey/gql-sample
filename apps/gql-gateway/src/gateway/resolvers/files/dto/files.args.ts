import { ArgsType, Field, registerEnumType } from '@nestjs/graphql';

export enum FileTypeEnum {
  Img = 'IMG',
  Text = 'TEXT',
}

registerEnumType(FileTypeEnum, { name: 'FileTypeEnum' });

@ArgsType()
export class AddFileArgs {
  @Field(() => FileTypeEnum)
  type: FileTypeEnum;

  @Field()
  isPrivate: boolean;
}
