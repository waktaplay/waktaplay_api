import { Connection } from 'mongoose';
import { StatisticsSchema } from '../schemas/statistics.schema';
import { StatisticsUpdatedAtSchema } from '../schemas/statisticsUpdatedAt.schema';

export const statisticsProviders = [
  {
    provide: 'STATISTICS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Statistics', StatisticsSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'STATISTICS_UPDATEDAT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('StatisticsDate', StatisticsUpdatedAtSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
