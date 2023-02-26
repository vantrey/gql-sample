import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PaymentModel } from './models/payment.model';
import { FilesServiceAdapter } from '../../../services/files/application/files-service-adapter';
import { AddPaymentArgs } from './dto/payment.args';
import { PaymentsServiceAdapter } from '../../../services/payments/application/payments-service-adapter';
import { UserModel } from '../users/models/users.model';
import { UsersServiceAdapter } from '../../../services/users/application/users-service-adapter';
import { FilesLoader } from '../../data-loaders/files.loader';
import * as DataLoader from 'dataloader';
import { Loader } from 'nestjs-dataloader/dist';
import { UsersLoader } from '../../data-loaders/users.loader';
import { FilesModel } from '../files/models/files.model';

@Resolver(() => PaymentModel)
export class PaymentsResolver {
  constructor(
    private filesServiceAdapter: FilesServiceAdapter,
    private paymentServiceAdapter: PaymentsServiceAdapter,
    private usersServiceAdapter: UsersServiceAdapter,
  ) {}

  @Query(() => PaymentModel, { name: 'payment', nullable: true })
  async getPayment(@Args('id') id: string): Promise<PaymentModel | null> {
    return this.paymentServiceAdapter.getPaymentById(id);
  }

  @Query(() => [PaymentModel], { name: 'payments', nullable: true })
  async getPayments(): Promise<PaymentModel[]> {
    return this.paymentServiceAdapter.getPayments();
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
    return this.paymentServiceAdapter.createPayment(args);
  }
}
