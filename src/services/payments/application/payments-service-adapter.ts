import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePaymentDto, PaymentDocument, PaymentsEntity } from '../entity/payments.entity';
import { FileType } from '../../files/entity/files.entity';
import { FilesServiceAdapter } from '../../files/application/files-service-adapter';

@Injectable()
export class PaymentsServiceAdapter {
  constructor(
    @InjectModel(PaymentsEntity.name) private readonly PaymentDocumentModel: Model<PaymentDocument>,
    private readonly fileServiceAdapter: FilesServiceAdapter,
  ) {}

  async createPayment(dto: Omit<CreatePaymentDto, 'billId'>): Promise<string> {
    const fileId = await this.fileServiceAdapter.createFile({
      type: FileType.Text,
      isPrivate: true,
    });
    const newPayment = new this.PaymentDocumentModel();
    newPayment.initialize(new CreatePaymentDto({ ...dto, billId: fileId }));
    await newPayment.save();

    return newPayment._id.toString();
  }
}
