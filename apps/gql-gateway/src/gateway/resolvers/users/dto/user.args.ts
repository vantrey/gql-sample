import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@ArgsType()
export class CreateUserArgs {
  @Field()
  @Length(5, 20)
  name: string;
}

@InputType()
class UpdateUserDto {
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  age?: number;
}

@ArgsType()
export class UpdateUserArgs {
  @Field()
  userId: string;
  @Field(() => UpdateUserDto)
  data: UpdateUserDto;
}

@ArgsType()
export class AddUserAvatarArgs {
  @Field()
  userId: string;

  @Field()
  avatarId: string;
}
