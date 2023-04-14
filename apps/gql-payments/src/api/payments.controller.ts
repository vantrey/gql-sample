import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreatePaymentInputType,
  PaymentsService,
  PaymentViewDto,
} from '../application/payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  async getPayments(): Promise<PaymentViewDto[]> {
    return this.paymentsService.getPayments();
  }

  @Get(':id')
  async getPaymentById(@Param('id') id: string): Promise<PaymentViewDto> {
    const result = await this.paymentsService.getPaymentById(id);

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  @Get('by-ids')
  async getPaymentsByIds(
    @Query('ids') ids: string[],
  ): Promise<PaymentViewDto[]> {
    const result = await this.paymentsService.getPaymentsByIds(ids);

    return result;
  }

  @Get('by-users-ids')
  async getPaymentsByUserIds(
    @Query('ids') ids: string[],
  ): Promise<PaymentViewDto[]> {
    const result = await this.paymentsService.getPaymentsByUserIds(ids);

    return result;
  }

  @Post()
  async createPayment(@Body() dto: CreatePaymentInputType): Promise<string> {
    return this.paymentsService.createPayment(dto);
  }
}
