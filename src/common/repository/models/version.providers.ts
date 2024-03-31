import { Connection } from 'mongoose';
import { VersionSchema } from '../schemas/version.schema';

export const versionProviders = [
  {
    provide: 'CLIENTVERSION_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('ClientVersion', VersionSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
