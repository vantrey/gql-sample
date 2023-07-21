import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { CurrencyEnum } from '../dto/payment.args';

registerEnumType(CurrencyEnum, { name: 'Currency' });

@ObjectType({ description: 'payments' })
export class PaymentModel {
  @Field()
  billId: string;

  @Field()
  contributorId: string;

  @Field(() => CurrencyEnum)
  currency: CurrencyEnum;

  @Field()
  id: string;

  @Field()
  price: number;
}
