import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateUserDto,
  UpdateUserDto,
  UserDocumentModelType,
  UsersEntity,
} from '../entity/users.entity';

export class UserViewDto {
  constructor(model) {
    //TODO: fix incorrect mapping
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
export class UsersService {
  constructor(
    @InjectModel(UsersEntity.name)
    private readonly UserDocumentModel: UserDocumentModelType,
  ) {}

  async createUser(dto: CreateUserDto): Promise<string> {
    const newUser = this.UserDocumentModel.initialize(dto);

    await newUser.save();

    return newUser._id.toString();
  }

  async updateUser(dto: UpdateUserDto, userId: string): Promise<boolean> {
    const user = await this.UserDocumentModel.findOne({
      _id: userId,
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
      _id: userId,
    });

    if (!user) {
      return false;
    }

    user.replaceAvatar(avatarId);
    await user.save();

    return true;
  }

  async getUserById(id: string): Promise<UserViewDto | null> {
    const result = await this.UserDocumentModel.findOne({
      _id: id,
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
    const result = await this.UserDocumentModel.find({
      _id: ids,
    }).lean();

    return result.map((result) => new UserViewDto(result));
  }
}
