import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MutateUserDto, UserDocument, UsersEntity } from '../entity/users.entity';

@Injectable()
export class UsersServiceAdater {
  constructor(
    @InjectModel(UsersEntity.name) private readonly UserDocumentModel: Model<UserDocument>,
  ) {}

  async createUser(dto: MutateUserDto): Promise<string> {
    const newUser = new this.UserDocumentModel();
    newUser.initialize(dto);
    await newUser.save();

    return newUser._id.toString();
  }

  async updateUser(dto: MutateUserDto, userId: string): Promise<void> {
    const user = await this.UserDocumentModel.findById(userId);
    user.updateUser(dto);
    await user.save();

    return;
  }

  async relaceAvatar(userId: string, avatarId: string): Promise<void> {
    const user = await this.UserDocumentModel.findById(userId);
    user.replaceAvatar(avatarId);
    await user.save();

    return;
  }
}
