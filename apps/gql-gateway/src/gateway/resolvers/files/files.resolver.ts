import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FilesModel } from './models/files.model';
import { AddFileArgs } from './dto/files.args';
import { HttpFilesService } from '@app/http-files';

@Resolver(() => FilesModel)
export class FilesResolver {
  constructor(private httpFilesService: HttpFilesService) {}

  @Query(() => FilesModel, { name: 'file', nullable: true })
  async getFile(@Args('id') id: string): Promise<FilesModel | null> {
    return this.httpFilesService.getFileById(id);
  }

  @Query(() => [FilesModel], { name: 'files', nullable: true })
  async getFiles(): Promise<FilesModel[]> {
    return this.httpFilesService.getFiles();
  }

  @Mutation(() => String)
  async addFile(@Args() args: AddFileArgs): Promise<string> {
    return this.httpFilesService.createFile(args);
  }
}
