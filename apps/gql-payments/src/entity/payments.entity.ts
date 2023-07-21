import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

export enum Currency {
  BYN = 'BYN',
  USD = 'USD',
}

export class CreatePaymentDto {
  contributorId: string;
  price: number;
  currency: Currency;
  billId: string;
}

const statics = {
  initialize(dto: CreatePaymentDto): PaymentDocument {
    const payment = {
      ...dto,
      createdAt: new Date(),
    };

    return new this(payment);
  },
};

type PaymentModelStatic = typeof statics;

@Schema({
  collection: 'payment',
  statics,
})
export class PaymentsEntity {
  @Prop({ enum: Currency, required: true })
  currency: Currency;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  contributorId: string;

  @Prop({ required: true })
  billId: string;

  @Prop({ required: true })
  createdAt: Date;
}

export const PaymentSchema =
  SchemaFactory.createForClass<PaymentsEntity>(PaymentsEntity);

export type PaymentDocument = HydratedDocument<PaymentsEntity>;

export type PaymentDocumentModelType = Model<PaymentDocument> &
  PaymentModelStatic;
