import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PaymentModel } from './models/payment.model';
import { AddPaymentArgs } from './dto/payment.args';
import { UserModel } from '../users/models/users.model';
import { FilesLoader } from '../../data-loaders/files.loader';
import * as DataLoader from 'dataloader';
import { Loader } from 'nestjs-dataloader/dist';
import { UsersLoader } from '../../data-loaders/users.loader';
import { FilesModel } from '../files/models/files.model';
import { HttpFilesService } from '@app/http-files';
import { HttpPaymentsService } from '@app/http-payments';
import { HttpUsersService } from '@app/http-users';

@Resolver(() => PaymentModel)
export class PaymentsResolver {
  constructor(
    private httpFilesService: HttpFilesService,
    private httpPaymentsService: HttpPaymentsService,
    private httpUsersService: HttpUsersService,
  ) {}

  @Query(() => PaymentModel, { name: 'payment', nullable: true })
  async getPayment(@Args('id') id: string): Promise<PaymentModel | null> {
    return this.httpPaymentsService.getPaymentById(id);
  }

  @Query(() => [PaymentModel], { name: 'payments', nullable: true })
  async getPayments(): Promise<PaymentModel[]> {
    return this.httpPaymentsService.getPayments();
  }

  @ResolveField(() => UserModel)
  async userData(
    @Parent() payment: PaymentModel,
    @Loader(UsersLoader) usersLoader: DataLoader<string, FilesLoader>,
  ) {
    const { contributorId } = payment;

    return await usersLoader.load(contributorId);
  }

  @ResolveField(() => FilesModel, { nullable: true })
  async billData(
    @Parent() payment: PaymentModel,
    @Loader(FilesLoader) filesLoader: DataLoader<string, FilesLoader>,
  ) {
    const { billId } = payment;

    return await filesLoader.load(billId);
  }

  @Mutation(() => String)
  async createPayment(@Args() args: AddPaymentArgs): Promise<string> {
    return this.httpPaymentsService.createPayment(args);
  }
}
