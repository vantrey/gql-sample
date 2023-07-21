import { NestFactory } from '@nestjs/core';
import { FilesModule } from './files.module';

async function bootstrap() {
  const app = await NestFactory.create(FilesModule);
  console.log('service-files 3004');
  await app.listen(3004);
}
bootstrap();
