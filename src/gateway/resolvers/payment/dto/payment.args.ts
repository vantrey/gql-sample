import { ArgsType, Field, registerEnumType } from '@nestjs/graphql';
import { CreatePaymentInputType } from '../../../../services/payments/application/payments-service-adapter';
import { Currency } from '../../../../services/payments/entity/payments.entity';

registerEnumType(Currency, { name: 'Currency' });

@ArgsType()
export class AddPaymentArgs implements CreatePaymentInputType {
  @Field()
  contributorId: string;

  @Field(() => Currency)
  currency: Currency;

  @Field()
  price: number;
}
