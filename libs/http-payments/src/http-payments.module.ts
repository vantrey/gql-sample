import { Module } from '@nestjs/common';
import { HttpPaymentsService } from './http-payments.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({ baseURL: 'http://localhost:3002/payments' })],
  providers: [HttpPaymentsService],
  exports: [HttpPaymentsService],
})
export class HttpPaymentsModule {}
