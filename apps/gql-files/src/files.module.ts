import { Module } from '@nestjs/common';
import { FilesController } from './api/files.controller';
import { FilesService } from './application/files.service';
import { DbFilesModule } from './db/db.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileSchema, FilesEntity } from './entity/files.entity';

@Module({
  imports: [
    DbFilesModule,
    MongooseModule.forFeature([{ name: FilesEntity.name, schema: FileSchema }]),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
