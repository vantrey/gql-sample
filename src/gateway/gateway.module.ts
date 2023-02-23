import { Module } from '@nestjs/common';
import { UsersModule } from '../services/users/users.module';
import { UsersResolver } from './resolvers/users/users.resolver';
import { FilesResolver } from './resolvers/files/files.resolver';
import { FilesModule } from '../services/files/files.module';

@Module({
  imports: [UsersModule, FilesModule],
  providers: [UsersResolver, FilesResolver],
  exports: [],
})
export class GatewayModule {}
