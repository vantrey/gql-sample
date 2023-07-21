import { Module } from '@nestjs/common';
import { HttpFilesService } from './http-files.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({ baseURL: 'http://localhost:3004/files' })],
  providers: [HttpFilesService],
  exports: [HttpFilesService],
})
export class HttpFilesModule {}
