import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateUserDto,
  UpdateUserDto,
  UserDocument,
  UsersEntity,
} from '../entity/users.entity';
import { ObjectId } from 'mongodb';

class UserViewDto {
  constructor(model) {
    Object.assign(this, model);
    this.id = model._id.toString();
  }
  id: string;
  name: string;
  age: number | null;
  email: string | null;
  avatarId: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}

@Injectable()
export class UsersServiceAdapter {
  constructor(
    @InjectModel(UsersEntity.name)
    private readonly UserDocumentModel: Model<UserDocument>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<string> {
    const newUser = new this.UserDocumentModel();
    newUser.initialize(dto);
    await newUser.save();

    return newUser._id.toString();
  }

  async updateUser(dto: UpdateUserDto, userId: string): Promise<boolean> {
    const user = await this.UserDocumentModel.findOne({
      _id: new ObjectId(userId),
    });

    if (!user) {
      return false;
    }

    user.updateUser(dto);
    await user.save();

    return true;
  }

  async replaceAvatar(userId: string, avatarId: string): Promise<boolean> {
    const user = await this.UserDocumentModel.findOne({
      _id: new ObjectId(userId),
    });

    if (!user) {
      return false;
    }

    user.replaceAvatar(avatarId);
    await user.save();

    return true;
  }

  async getUserById(id: string): Promise<UserViewDto> {
    const result = await this.UserDocumentModel.findOne({
      _id: new ObjectId(id),
    }).lean();

    if (!result) {
      return null;
    }

    return new UserViewDto(result);
  }

  async getUsers(): Promise<UserViewDto[]> {
    const result = await this.UserDocumentModel.find({}).lean();

    return result.map((result) => new UserViewDto(result));
  }

  async getUsersByIds(ids: string[]): Promise<UserViewDto[]> {
    const objectIds = ids.map((id) => new ObjectId(id));
    const result = await this.UserDocumentModel.find({
      _id: objectIds,
    }).lean();

    return result.map((result) => new UserViewDto(result));
  }
}
