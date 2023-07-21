import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import querystring from 'querystring';

enum FileTypeEnum {
  Img = 'IMG',
  Text = 'TEXT',
}

type FileViewType = {
  id: string;
  type: FileTypeEnum;
  fileName: string;
  ext: string;
  url: string;
  createdAt: Date;
  isPrivate: boolean;
};

type CreateFileData = {
  type: FileTypeEnum;
  isPrivate: boolean;
};

@Injectable()
export class HttpFilesService {
  constructor(private readonly httpFilesService: HttpService) {}

  async getFiles() {
    return this.httpFilesService.axiosRef
      .get<FileViewType[]>('')
      .then((res) => res.data);
  }

  async getFileById(id: string) {
    return this.httpFilesService.axiosRef
      .get<FileViewType>(`/${id}`)
      .then((res) => res.data);
  }

  async getFilesByIds(ids: string[]) {
    const query = querystring.stringify({ ids });

    return this.httpFilesService.axiosRef
      .get<FileViewType[]>(`by-ids?${query}`)
      .then((res) => res.data);
  }

  async createFile(dto: CreateFileData) {
    return this.httpFilesService.axiosRef
      .post<string>(``, dto)
      .then((res) => res.data);
  }
}
