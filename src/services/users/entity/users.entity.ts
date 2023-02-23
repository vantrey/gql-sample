import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export class MutateUserDto {
  name: string;
}

@Schema({ collection: 'users' })
export class UsersEntity {
  @Prop({ required: true, type: mongoose.Types.ObjectId })
  _id: ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  avatarId: string | null;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date | null;

  initialize(dto: MutateUserDto) {
    this.name = dto.name;
    this.avatarId = null;
    this.createdAt = new Date();
    this.updatedAt = null;
    this._id = new ObjectId();
  }

  updateUser(dto: MutateUserDto) {
    this.name = dto.name;
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
