import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserModel } from './models/users.model';
import { UsersServiceAdapter } from '../../../services/users/application/users-service-adapter';
import {
  AddUserAvatarArgs,
  CreateUserArgs,
  UpdateUserArgs,
} from './dto/user.args';
import { AuthGuard } from '../../guards/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => UserModel)
export class UsersResolver {
  constructor(private usersServiceAdapter: UsersServiceAdapter) {}

  @Query(() => UserModel, { name: 'user', nullable: true })
  async getUser(@Args('id') id: string): Promise<UserModel> {
    return this.usersServiceAdapter.getUserById(id);
  }

  @Query(() => [UserModel], { name: 'users', nullable: true })
  async getUsers(): Promise<UserModel[]> {
    return this.usersServiceAdapter.getUsers();
  }

  // @ResolveField()
  // async posts(@Parent() author: Author) {
  //   const { id } = author;
  //   return this.postsService.findAll({ authorId: id });
  // }

  @Mutation(() => String)
  @UseGuards(AuthGuard)
  async createUser(@Args() args: CreateUserArgs): Promise<string> {
    return this.usersServiceAdapter.createUser(args);
  }

  @Mutation(() => Boolean)
  async updateUser(@Args() args: UpdateUserArgs): Promise<boolean> {
    return this.usersServiceAdapter.updateUser(args.data, args.userId);
  }

  @Mutation(() => Boolean)
  async addUserAvatar(@Args() args: AddUserAvatarArgs): Promise<boolean> {
    return this.usersServiceAdapter.replaceAvatar(args.userId, args.avatarId);
  }
}
