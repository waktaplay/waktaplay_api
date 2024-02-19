import { Connection } from 'mongoose';
import { HeartsSchema } from '../schemas/hearts.schema';

export const heartsProviders = [
  {
    provide: 'HEARTS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Hearts', HeartsSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
