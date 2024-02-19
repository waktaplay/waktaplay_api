import mongoose from 'mongoose';

export interface IStatisticsUpdatedAt {
  realtime: number;
  daily: number;
  weekly: number;
  total: number;
}

export const StatisticsUpdatedAtSchema =
  new mongoose.Schema<IStatisticsUpdatedAt>({
    realtime: {
      type: Number,
      required: true,
    },
    daily: {
      type: Number,
      required: true,
    },
    weekly: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  });
