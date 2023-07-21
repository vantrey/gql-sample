import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as querystring from 'querystring';

enum CurrencyEnum {
  BYN = 'BYN',
  USD = 'USD',
}

type CreatePaymentData = {
  contributorId: string;
  price: number;
  currency: CurrencyEnum;
};

type PaymentType = {
  id: string;
  currency: CurrencyEnum;
  price: number;
  contributorId: string;
  billId: string;
  createdAt: Date;
};

@Injectable()
export class HttpPaymentsService {
  constructor(private readonly httpPaymentsService: HttpService) {}

  async getPayments() {
    return this.httpPaymentsService.axiosRef
      .get<PaymentType[]>('')
      .then((res) => res.data);
  }

  async getPaymentById(id: string) {
    return this.httpPaymentsService.axiosRef
      .get<PaymentType>(`/${id}`)
      .then((res) => res.data);
  }

  async getPaymentsByIds(ids: string[]) {
    const query = querystring.stringify({ ids });

    return this.httpPaymentsService.axiosRef
      .get<PaymentType[]>(`by-ids?${query}`)
      .then((res) => res.data);
  }

  async getPaymentsByUserIds(ids: string[]) {
    const query = querystring.stringify({ ids });

    return this.httpPaymentsService.axiosRef
      .get<PaymentType[]>(`by-users-ids?${query}`)
      .then((res) => res.data);
  }

  async createPayment(dto: CreatePaymentData) {
    return this.httpPaymentsService.axiosRef
      .post<string>(``, dto)
      .then((res) => res.data);
  }
}
