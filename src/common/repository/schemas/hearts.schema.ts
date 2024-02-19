import mongoose from 'mongoose';

export interface IHearts {
  artist: string;
  music: string;
  user?: string;
  date: Date;
}

export const HeartsSchema = new mongoose.Schema<IHearts>({
  artist: {
    type: String,
    required: false,
  },
  music: {
    type: String,
    required: false,
  },
  user: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});
