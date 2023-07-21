import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';

async function bootstrap() {
  console.log('service-payment - 3002');
  const app = await NestFactory.create(PaymentsModule);
  await app.listen(3002);
}
bootstrap();
