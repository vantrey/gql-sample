import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import {
  UserInputError,
  ForbiddenError,
  ApolloError,
  AuthenticationError,
} from 'apollo-server-express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const token = ctx.getContext().req.headers.token;

    if (token !== '123') {
      throw new AuthenticationError('auauthorized');
    }

    return true;
  }
}
