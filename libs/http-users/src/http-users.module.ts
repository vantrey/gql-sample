import { Module } from '@nestjs/common';
import { HttpUsersService } from './http-users.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({ baseURL: 'http://localhost:3001/users' })],
  providers: [HttpUsersService],
  exports: [HttpUsersService],
})
export class HttpUsersModule {}
