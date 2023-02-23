import { Module } from '@nestjs/common';
import { FilesServiceAdapter } from './application/files-service-adapter';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesEntity, FileSchema } from './entity/files.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: FilesEntity.name, schema: FileSchema }]),
  ],
  providers: [FilesServiceAdapter],
  exports: [FilesServiceAdapter],
})
export class FilesModule {}
