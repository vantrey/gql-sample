import { Test, TestingModule } from '@nestjs/testing';
import { HttpPaymentsService } from './http-payments.service';

describe('HttpPaymentsService', () => {
  let service: HttpPaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpPaymentsService],
    }).compile();

    service = module.get<HttpPaymentsService>(HttpPaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
