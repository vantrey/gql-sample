import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'user profile' })
export class UserModel {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  email: string | null;

  @Field({ nullable: true })
  age: number;

  @Field({ nullable: true })
  avatarId: string | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}
