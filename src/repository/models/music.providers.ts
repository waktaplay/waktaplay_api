import { Connection } from 'mongoose';
import { MusicSchema } from '../schemas/music.schema';

export const musicProviders = [
  {
    provide: 'MUSIC_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Music', MusicSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
