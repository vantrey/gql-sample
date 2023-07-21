import { Module } from '@nestjs/common';
import { PaymentsService } from './application/payments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentSchema, PaymentsEntity } from './entity/payments.entity';
import { PaymentsController } from './api/payments.controller';
import { DbPaymentModule } from './db/db.module';
import { HttpFilesModule } from '@app/http-files';

@Module({
  imports: [
    HttpFilesModule,
    DbPaymentModule,
    MongooseModule.forFeature([
      { name: PaymentsEntity.name, schema: PaymentSchema },
    ]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [],
})
export class PaymentsModule {}
