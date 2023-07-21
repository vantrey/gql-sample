import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { FileViewDto, FilesService } from '../application/files.service';
import { CreateFileDto } from '../entity/files.entity';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get()
  async getFiles(): Promise<FileViewDto[]> {
    return this.filesService.getFiles();
  }

  @Get(':id')
  async getFileById(@Param('id') id: string): Promise<FileViewDto> {
    const result = await this.filesService.getFileById(id);
    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  @Get('by-ids')
  async getFileByIds(@Query('ids') ids: string[]): Promise<FileViewDto[]> {
    console.log('IDS', ids);
    const result = await this.filesService.getFilesByIds(ids);

    return result;
  }

  @Post()
  async createFile(@Body() dto: CreateFileDto): Promise<{ fileId: string }> {
    const result = await this.filesService.createFile(dto);

    return { fileId: result };
  }
}
