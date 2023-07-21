import { Test, TestingModule } from '@nestjs/testing';
import { HttpUsersService } from './http-users.service';

describe('HttpUsersService', () => {
  let service: HttpUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpUsersService],
    }).compile();

    service = module.get<HttpUsersService>(HttpUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
