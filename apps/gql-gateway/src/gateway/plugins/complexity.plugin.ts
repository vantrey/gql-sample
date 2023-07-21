import { Plugin } from '@nestjs/apollo';
import {
  ApolloServerPlugin,
  GraphQLRequestListener,
  GraphQLServiceContext,
} from 'apollo-server-plugin-base';
import { GraphQLSchema } from 'graphql';
import {
  fieldExtensionsEstimator,
  getComplexity,
  simpleEstimator,
} from 'graphql-query-complexity';
import { ApolloError } from 'apollo-server-express';

const MAX_COMPLEXITY = 400;

@Plugin()
export class ComplexityPlugin implements ApolloServerPlugin {
  private schema: GraphQLSchema;

  async serverWillStart(service: GraphQLServiceContext) {
    this.schema = service.schema;
  }

  async requestDidStart(): Promise<GraphQLRequestListener> {
    return {
      didResolveOperation: async ({ request, document }) => {
        const complexity = getComplexity({
          schema: this.schema,
          operationName: request.operationName,
          query: document,
          variables: request.variables,
          estimators: [
            fieldExtensionsEstimator(),
            simpleEstimator({ defaultComplexity: 1 }),
          ],
        });

        if (complexity > MAX_COMPLEXITY) {
          throw new ApolloError(
            `Query is too complex: ${complexity}. Maximum allowed complexity: ${MAX_COMPLEXITY}`,
            'COMPLEXITY_ERROR',
          );
        }
      },
    };
  }
}
