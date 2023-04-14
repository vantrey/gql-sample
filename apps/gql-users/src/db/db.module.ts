import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => {
        const MONGO_URI = 'mongodb://localhost:27017';

        console.log('MONGO_URL users =', MONGO_URI);

        return {
          uri: MONGO_URI,
          dbName: 'users',
        };
      },
    }),
  ],
})
export class DbUsersModule {}
