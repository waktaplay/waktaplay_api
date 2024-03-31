import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

import { RepositoryModule } from 'src/common/repository/repository.module';
import { maintenanceProviders } from 'src/common/repository/models/maintenance.providers';
import { versionProviders } from 'src/common/repository/models/version.providers';

@Module({
  imports: [RepositoryModule],
  controllers: [ClientController],
  providers: [ClientService, ...maintenanceProviders, ...versionProviders],
})
export class ClientModule {}
