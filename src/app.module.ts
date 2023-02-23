import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesModule } from './services/files/files.module';
import { UsersModule } from './services/users/users.module';
import { PaymentsModule } from './services/payments/payments.module';
import { MongoModule } from './services/db/mongo/mongo.module';

@Module({
  imports: [FilesModule, UsersModule, PaymentsModule, MongoModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
