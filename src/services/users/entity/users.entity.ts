import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export class CreateUserDto {
  name: string;
}

export class UpdateUserDto {
  email?: string;
  age?: number;
}

@Schema({ collection: 'users' })
export class UsersEntity {
  @Prop({ type: mongoose.Types.ObjectId })
  _id: ObjectId;

  @Prop()
  name: string;

  @Prop()
  age: number | null;

  @Prop()
  email: string | null;

  @Prop()
  avatarId: string | null;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date | null;

  initialize(dto: CreateUserDto) {
    Object.assign(this, dto);
    this.email = null;
    this.age = null;
    this.avatarId = null;
    this.createdAt = new Date();
    this.updatedAt = null;
    this._id = new ObjectId();
  }

  updateUser(dto: UpdateUserDto) {
    console.log(dto);
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
  initialize: UsersEntity.prototype.initialize,
  updateUser: UsersEntity.prototype.updateUser,
  replaceAvatar: UsersEntity.prototype.replaceAvatar,
};

export type UserDocument = UsersEntity & Document<ObjectId>;
