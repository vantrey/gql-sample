import { Module } from '@nestjs/common';
import { UsersController } from './api/users.controller';
import { UsersService } from './application/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, UsersEntity } from './entity/users.entity';
import { DbUsersModule } from './db/db.module';

@Module({
  imports: [
    DbUsersModule,
    MongooseModule.forFeature([{ name: UsersEntity.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
