import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './mongo.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => {
        const MONGO_URI =
          'mongodb+srv://ivan:BADdViIct7rWVvkM@cluster0.czpft.mongodb.net/gql';

        console.log('MONGO_URL =', MONGO_URI);

        return {
          uri: MONGO_URI,
        };
      },
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class MongoModule {}
