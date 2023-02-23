import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export enum Currency {
  BYN = 'BYN',
  USD = 'USD',
}

export class CreatePaymentDto {
  constructor(model: CreatePaymentDto) {
    Object.assign(this, model);
  }
  contributorId: string;
  price: number;
  currency: Currency;
  billId: string;
}

@Schema({ collection: 'payment' })
export class PaymentsEntity {
  @Prop({ required: true, type: mongoose.Types.ObjectId })
  _id: ObjectId;

  @Prop({ required: true, enum: Currency })
  currency: Currency;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  contributorId: string;

  @Prop({ required: true })
  billId: string;

  @Prop({ required: true })
  createdAt: Date;

  initialize(dto: CreatePaymentDto) {
    this.contributorId = dto.contributorId;
    this.price = dto.price;
    this.currency = dto.currency;
    this.createdAt = new Date();
    this.billId = dto.billId;
    this._id = new ObjectId();
  }
}

export const PaymentSchema = SchemaFactory.createForClass(PaymentsEntity);

PaymentSchema.methods = {
  initialize: PaymentsEntity.prototype.initialize,
};

export type PaymentDocument = PaymentsEntity & Document<ObjectId>;
