import mongoose from 'mongoose';

export interface IPlaylist {
  id: string;
  title: string;
  description?: string;
  data: string[];
  author: string;
  date: Date;
  sharing: boolean;
}

export const PlaylistSchema = new mongoose.Schema<IPlaylist>({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  data: {
    type: [String],
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  sharing: {
    type: Boolean,
    required: true,
    default: false,
  },
});
