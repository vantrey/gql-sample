import { Test, TestingModule } from '@nestjs/testing';
import { HttpFilesService } from './http-files.service';

describe('HttpFilesService', () => {
  let service: HttpFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpFilesService],
    }).compile();

    service = module.get<HttpFilesService>(HttpFilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
