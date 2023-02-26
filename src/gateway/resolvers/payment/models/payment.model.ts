import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Currency } from '../../../../services/payments/entity/payments.entity';

registerEnumType(Currency, { name: 'Currency' });

@ObjectType({ description: 'payments' })
export class PaymentModel {
  @Field()
  billId: string;

  @Field()
  contributorId: string;

  @Field(() => Currency)
  currency: Currency;

  @Field()
  id: string;

  @Field()
  price: number;
}
