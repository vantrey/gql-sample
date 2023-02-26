import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

export class CreateUserDto {
  name: string;
}

export class UpdateUserDto {
  email?: string;
  age?: number;
}

const statics = {
  initialize(dto: CreateUserDto): UserDocument {
    const user = {
      ...dto,
      email: null,
      age: null,
      avatarId: null,
      createdAt: new Date(),
      updatedAt: null,
    };

    return new this(user);
  },
};

type UserModelStatic = typeof statics;

@Schema({ collection: 'users', statics })
export class UsersEntity {
  @Prop()
  name: string;

  @Prop({ type: Number, required: false })
  age: number | null;

  @Prop({ type: String, required: false })
  email: string | null;

  @Prop({ type: String, required: false })
  avatarId: string | null;

  @Prop({ type: Date, required: true })
  createdAt: Date;

  @Prop({ type: Date, required: false })
  updatedAt: Date | null;

  updateUser(dto: UpdateUserDto) {
    this.age = dto.age ? dto.age : this.age;
    this.email = dto.email ? dto.email : this.email;

    if (!dto.age && !dto.email) {
      return;
    }

    this.updatedAt = new Date();
  }

  replaceAvatar(avatarId: string) {
    this.avatarId = avatarId;
  }
}

export const UserSchema = SchemaFactory.createForClass(UsersEntity);

UserSchema.methods = {
  updateUser: UsersEntity.prototype.updateUser,
  replaceAvatar: UsersEntity.prototype.replaceAvatar,
};

type UserDocument = HydratedDocument<UsersEntity>;

export type UserDocumentModelType = Model<UserDocument> & UserModelStatic;
