import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserModel } from './models/users.model';
import {
  AddUserAvatarArgs,
  CreateUserArgs,
  UpdateUserArgs,
} from './dto/user.args';
import { AuthGuard } from '../../guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { FilesModel } from '../files/models/files.model';
import { Loader } from 'nestjs-dataloader';
import { FilesLoader } from '../../data-loaders/files.loader';
import * as DataLoader from 'dataloader';
import { PaymentModel } from '../payment/models/payment.model';
import { PaymentsLoader } from '../../data-loaders/payments.loader';
import { HttpUsersService } from '@app/http-users';

@Resolver(() => UserModel)
export class UsersResolver {
  constructor(private usersHttpService: HttpUsersService) {}

  @Query(() => UserModel, { name: 'user', nullable: true })
  async getUser(@Args('id') id: string): Promise<UserModel | null> {
    return this.usersHttpService.getUserById(id);
  }

  @Query(() => [UserModel], { name: 'users', nullable: true, complexity: 5 })
  async getUsers(): Promise<UserModel[]> {
    return this.usersHttpService.getUsers();
  }

  @ResolveField(() => FilesModel, { nullable: true })
  async avatarData(
    @Parent() user: UserModel,
    @Loader(FilesLoader) filesLoader: DataLoader<string, FilesLoader>,
  ) {
    const { avatarId } = user;

    if (!avatarId) {
      return null;
    }

    return await filesLoader.load(avatarId);
  }

  @ResolveField(() => [PaymentModel], { nullable: true })
  async paymentsData(
    @Parent() user: UserModel,
    @Loader(PaymentsLoader) paymentsLoader: DataLoader<string, FilesLoader>,
  ) {
    const { id } = user;
    console.log(user);

    return await paymentsLoader.load(id);
  }

  @Mutation(() => String)
  @UseGuards(AuthGuard)
  async createUser(@Args() args: CreateUserArgs): Promise<string> {
    return this.usersHttpService.createUser(args);
  }

  @Mutation(() => Boolean)
  async updateUser(@Args() args: UpdateUserArgs): Promise<boolean> {
    return this.usersHttpService.updateUser(args.data, args.userId);
  }

  @Mutation(() => Boolean)
  async addUserAvatar(@Args() args: AddUserAvatarArgs): Promise<boolean> {
    return this.usersHttpService.replaceUserAvatar(
      {
        avatarId: args.userId,
      },
      args.avatarId,
    );
  }
}
