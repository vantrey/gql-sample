import { ArgsType, Field, registerEnumType } from '@nestjs/graphql';

export enum CurrencyEnum {
  BYN = 'BYN',
  USD = 'USD',
}

registerEnumType(CurrencyEnum, { name: 'CurrencyEnum' });

@ArgsType()
export class AddPaymentArgs {
  @Field()
  contributorId: string;

  @Field(() => CurrencyEnum)
  currency: CurrencyEnum;

  @Field()
  price: number;
}
