import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader/dist';
import * as DataLoader from 'dataloader';
import { PaymentModel } from '../resolvers/payment/models/payment.model';
import { HttpPaymentsService } from '@app/http-payments';

@Injectable()
export class PaymentsLoader
  implements NestDataLoader<string, PaymentModel[] | null>
{
  constructor(private httpPaymentsService: HttpPaymentsService) {}

  generateDataLoader(): DataLoader<string, PaymentModel[] | null> {
    return new DataLoader<string, PaymentModel[] | null>(
      async (userIds: string[]) => {
        const payments = await this.httpPaymentsService.getPaymentsByUserIds(
          userIds,
        );

        console.log('paymentsIds', userIds);

        const paymentsGroupedByUser = userIds.map((userId) => {
          return payments.filter((payment) => payment.contributorId == userId);
        });

        // postsGroupedByUser = [
        //  [
        //    {title: "A", userId: 1},
        // 	{title: "B", userId: 1}
        //  ],
        //  [
        //    {title: "C", userId: 2}
        //  ]
        // ]

        return paymentsGroupedByUser;
      },
    );
  }
}
