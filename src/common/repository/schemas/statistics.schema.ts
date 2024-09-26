import mongoose from 'mongoose';

export interface IStatistics {
  id: string;
  realtime: IStatisticData;
  daily: IStatisticData;
  total: IStatisticData;
  weekly: IStatisticData;
}

export type IStatisticData = {
  views: number;
  rank: number | 'NEW';
};

export const StatisticsSchema = new mongoose.Schema<IStatistics>({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  realtime: {
    views: {
      type: Number,
      required: true,
      default: 0,
    },
    rank: {
      type: Number || String,
      required: true,
      default: 'NEW',
    },
  },
  daily: {
    views: {
      type: Number,
      required: true,
      default: 0,
    },
    rank: {
      type: Number || String,
      required: true,
      default: 'NEW',
    },
  },
  total: {
    views: {
      type: Number,
      required: true,
      default: 0,
    },
    rank: {
      type: Number || String,
      required: true,
      default: 'NEW',
    },
  },
  weekly: {
    views: {
      type: Number,
      required: true,
      default: 0,
    },
    rank: {
      type: Number || String,
      required: true,
      default: 'NEW',
    },
  },
});
