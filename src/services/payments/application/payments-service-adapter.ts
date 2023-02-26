import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreatePaymentDto,
  Currency,
  PaymentDocumentModelType,
  PaymentsEntity,
} from '../entity/payments.entity';
import { FileType } from '../../files/entity/files.entity';
import { FilesServiceAdapter } from '../../files/application/files-service-adapter';

export class PaymentViewDto {
  constructor(model) {
    //TODO: fix incorrect mapping
    Object.assign(this, model);
    this.id = model._id.toString();
  }

  id: string;
  currency: Currency;
  price: number;
  contributorId: string;
  billId: string;
  createdAt: Date;
}

export type CreatePaymentInputType = Omit<CreatePaymentDto, 'billId'>;

@Injectable()
export class PaymentsServiceAdapter {
  constructor(
    @InjectModel(PaymentsEntity.name)
    private readonly PaymentDocumentModel: PaymentDocumentModelType,
    private readonly fileServiceAdapter: FilesServiceAdapter,
  ) {}

  async createPayment(dto: CreatePaymentInputType): Promise<string> {
    const fileId = await this.fileServiceAdapter.createFile({
      type: FileType.Text,
      isPrivate: true,
    });

    const newPayment = this.PaymentDocumentModel.initialize({
      ...dto,
      billId: fileId,
    });

    await newPayment.save();

    return newPayment._id.toString();
  }

  async getPaymentById(id: string): Promise<PaymentViewDto | null> {
    const result = await this.PaymentDocumentModel.findOne({
      _id: id,
    }).lean();

    if (!result) {
      return null;
    }

    return new PaymentViewDto(result);
  }

  async getPayments(): Promise<PaymentViewDto[]> {
    const result = await this.PaymentDocumentModel.find({}).lean();

    return result.map((result) => new PaymentViewDto(result));
  }

  async getPaymentsByIds(ids: string[]): Promise<PaymentViewDto[]> {
    const result = await this.PaymentDocumentModel.find({
      _id: ids,
    }).lean();

    return result.map((result) => new PaymentViewDto(result));
  }

  async getPaymentsByUserIds(ids: string[]): Promise<PaymentViewDto[]> {
    const result = await this.PaymentDocumentModel.find({
      contributorId: ids,
    }).lean();

    return result.map((result) => new PaymentViewDto(result));
  }
}
