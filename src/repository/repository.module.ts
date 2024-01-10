import { Module } from '@nestjs/common';
import { databaseProviders } from './config/database.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class RepositoryModule {}
