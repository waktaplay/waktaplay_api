import { ConfigModule, ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';

export const databaseProviders = [
  {
    imports: [ConfigModule],
    inject: [ConfigService],
    provide: 'DATABASE_CONNECTION',
    useFactory: (configService: ConfigService): mongoose.Connection =>
      mongoose.createConnection(configService.get('MONGODB')),
  },
  {
    imports: [ConfigModule],
    inject: [ConfigService],
    provide: 'USERS_DATABASE_CONNECTION',
    useFactory: (configService: ConfigService): mongoose.Connection =>
      mongoose.createConnection(configService.get('MONGODB_USERS')),
  },
];
