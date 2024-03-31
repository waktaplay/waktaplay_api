import { Connection } from 'mongoose';
import { MaintenanceSchema } from '../schemas/maintenance.schema';

export const maintenanceProviders = [
  {
    provide: 'MAINTENANCE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Maintenance', MaintenanceSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
