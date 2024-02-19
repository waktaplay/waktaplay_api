import mongoose from 'mongoose';

export interface IArtist {
  id: string;
  name: string;
  engName: string;
  shortName: string;
  group: string;
  color: string;
  twitch?: string;
  youtube?: string;
  instagram?: string;
}

export const ArtistSchema = new mongoose.Schema<IArtist>({
  name: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    required: true,
  },
  engName: {
    type: String,
    required: true,
  },
  shortName: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  twitch: String,
  youtube: String,
  instagram: String,
});
