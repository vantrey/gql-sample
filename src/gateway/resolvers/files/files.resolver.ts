import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FilesModel } from './models/files.model';
import { FilesServiceAdapter } from '../../../services/files/application/files-service-adapter';
import { AddFileArgs } from './dto/files.args';

@Resolver(() => FilesModel)
export class FilesResolver {
  constructor(private filesServiceAdapter: FilesServiceAdapter) {}

  @Query(() => FilesModel, { name: 'file', nullable: true })
  async getFile(@Args('id') id: string): Promise<FilesModel> {
    return this.filesServiceAdapter.getFileById(id);
  }

  @Query(() => [FilesModel], { name: 'files', nullable: true })
  async getFiles(): Promise<FilesModel[]> {
    return this.filesServiceAdapter.getFiles();
  }

  @Mutation(() => String)
  async addFile(@Args() args: AddFileArgs): Promise<string> {
    return this.filesServiceAdapter.createFile(args);
  }
}
