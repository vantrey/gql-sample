import { Module } from '@nestjs/common';
import { UsersModule } from '../services/users/users.module';
import { UsersResolver } from './resolvers/users/users.resolver';
import { FilesResolver } from './resolvers/files/files.resolver';
import { FilesModule } from '../services/files/files.module';
import { FilesLoader } from './data-loaders/files.loader';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { PaymentsResolver } from './resolvers/payment/payments.resolver';
import { PaymentsModule } from '../services/payments/payments.module';
import { ComplexityPlugin } from './plugins/complexity.plugin';
import { UsersLoader } from './data-loaders/users.loader';
import { PaymentsLoader } from './data-loaders/payments.loader';

@Module({
  imports: [UsersModule, FilesModule, PaymentsModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
    UsersResolver,
    FilesResolver,
    FilesLoader,
    PaymentsResolver,
    ComplexityPlugin,
    UsersLoader,
    PaymentsLoader,
  ],
  exports: [],
})
export class GatewayModule {}
