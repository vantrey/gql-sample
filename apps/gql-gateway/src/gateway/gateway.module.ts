import { Module } from '@nestjs/common';
import { UsersResolver } from './resolvers/users/users.resolver';
import { FilesResolver } from './resolvers/files/files.resolver';
import { FilesLoader } from './data-loaders/files.loader';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { PaymentsResolver } from './resolvers/payment/payments.resolver';
import { ComplexityPlugin } from './plugins/complexity.plugin';
import { UsersLoader } from './data-loaders/users.loader';
import { PaymentsLoader } from './data-loaders/payments.loader';
import { HttpUsersModule } from '@app/http-users';
import { HttpPaymentsModule } from '@app/http-payments';
import { HttpFilesModule } from '@app/http-files';

@Module({
  imports: [HttpUsersModule, HttpPaymentsModule, HttpFilesModule],
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
