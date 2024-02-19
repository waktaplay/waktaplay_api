import { Connection } from 'mongoose';
import { ArtistSchema } from '../schemas/artist.schema';

export const artistProviders = [
  {
    provide: 'ARTIST_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Artist', ArtistSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
