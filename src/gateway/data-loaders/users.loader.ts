import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader/dist';
import * as DataLoader from 'dataloader';
import { UsersServiceAdapter } from '../../services/users/application/users-service-adapter';
import { UserModel } from '../resolvers/users/models/users.model';

@Injectable()
export class UsersLoader implements NestDataLoader<string, UserModel | null> {
  constructor(private usersServiceAdapter: UsersServiceAdapter) {}

  generateDataLoader(): DataLoader<string, UserModel | null> {
    return new DataLoader<string, UserModel | null>(async (keys: string[]) => {
      const users = await this.usersServiceAdapter.getUsersByIds(keys);

      //DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>,
      // the function must return a Promise of an Array of the same length as the Array of keys

      return keys.map((id) => {
        return users.find((file) => file.id === id) || null;
      });
    });
  }
}
