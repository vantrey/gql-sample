import { Module } from '@nestjs/common';
import { UsersServiceAdater } from './application/users-service-adater';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersEntity, UserSchema } from './entity/users.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UsersEntity.name, schema: UserSchema }]),
  ],
  providers: [UsersServiceAdater],
  exports: [UsersServiceAdater],
})
export class UsersModule {}
