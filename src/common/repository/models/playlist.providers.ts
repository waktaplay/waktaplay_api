import { Connection } from 'mongoose';
import { PlaylistSchema } from '../schemas/playlist.schema';

export const playlistProviders = [
  {
    provide: 'PLAYLIST_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Playlist', PlaylistSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
