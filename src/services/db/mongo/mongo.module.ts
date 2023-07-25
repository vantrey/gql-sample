import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './mongo.service';

console.log('commit');

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => {
        const MONGO_URI = 'mongodb://localhost:27017';

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
