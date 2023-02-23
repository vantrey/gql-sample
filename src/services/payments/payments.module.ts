import { Module } from '@nestjs/common';
import { PaymentsServiceAdapter } from './application/payments-service-adapter';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentsEntity, PaymentSchema } from './entity/payments.entity';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PaymentsEntity.name, schema: PaymentSchema },
    ]),
    FilesModule,
  ],
  providers: [PaymentsServiceAdapter],
  exports: [PaymentsServiceAdapter],
})
export class PaymentsModule {}
