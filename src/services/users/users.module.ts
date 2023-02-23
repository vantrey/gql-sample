import { Module } from '@nestjs/common';
import { UsersServiceAdapter } from './application/users-service-adapter';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersEntity, UserSchema } from './entity/users.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UsersEntity.name, schema: UserSchema }]),
  ],
  providers: [UsersServiceAdapter],
  exports: [UsersServiceAdapter],
})
export class UsersModule {}
