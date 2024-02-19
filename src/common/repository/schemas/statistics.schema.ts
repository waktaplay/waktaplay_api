import mongoose from 'mongoose';

export interface IStatistics {
  id: string;
  realtime: IStatisticData;
  daily: IStatisticData;
  total: IStatisticData;
  weekly: IStatisticData;
}

export type IStatisticData = {
  current: number;
  increase: number;
};

export const StatisticsSchema = new mongoose.Schema<IStatistics>({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  realtime: {
    current: {
      type: Number,
      required: true,
      default: 0,
    },
    increase: Number || null,
  },
  daily: {
    current: {
      type: Number,
      required: true,
      default: 0,
    },
    increase: Number || null,
  },
  total: {
    current: {
      type: Number,
      required: true,
      default: 0,
    },
    increase: Number || null,
  },
  weekly: {
    current: {
      type: Number,
      required: true,
      default: 0,
    },
    increase: Number || null,
  },
});
