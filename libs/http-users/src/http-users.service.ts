import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as querystring from 'querystring';

type UserType = {
  id: string;
  name: string;
  age: number | null;
  email: string | null;
  avatarId: string | null;
  createdAt: Date;
  updatedAt: Date | null;
};

type CreateUserData = {
  name: string;
};

type UpdateUserData = {
  email?: string;
  age?: number;
};

@Injectable()
export class HttpUsersService {
  constructor(private readonly httpUsersService: HttpService) {}

  async getUsers() {
    return this.httpUsersService.axiosRef
      .get<UserType[]>('')
      .then((res) => res.data);
  }

  async getUserById(id: string) {
    return this.httpUsersService.axiosRef
      .get<UserType>(`/${id}`)
      .then((res) => res.data);
  }

  async getUsersByIds(ids: string[]) {
    const query = querystring.stringify({ ids });

    return this.httpUsersService.axiosRef
      .get<UserType[]>(`by-ids?${query}`)
      .then((res) => res.data);
  }

  async createUser(dto: CreateUserData) {
    return this.httpUsersService.axiosRef
      .post<string>(``, dto)
      .then((res) => res.data);
  }

  async updateUser(dto: UpdateUserData, id: string) {
    return this.httpUsersService.axiosRef
      .post<boolean>(`/${id}`, dto)
      .then((res) => res.data);
  }

  async replaceUserAvatar(dto: { avatarId: string }, id: string) {
    return this.httpUsersService.axiosRef
      .post<boolean>(`avatar/${id}`, dto)
      .then((res) => res.data);
  }
}
