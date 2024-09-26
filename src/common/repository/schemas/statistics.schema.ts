import mongoose from 'mongoose';

export interface IStatistics {
  id: string;
  realtime: IStatisticData;
  daily: IStatisticData;
  total: IStatisticData;
  weekly: IStatisticData;
}

export type IStatisticData = {
  /**
   * 현재 조회수 값
   * @example 1
   */
  views: number;

  /**
   * 조회수 증감량
   * @example -1
   */
  rank: number;
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
      type: Number,
      required: true,
      default: -1,
    },
  },
  daily: {
    views: {
      type: Number,
      required: true,
      default: 0,
    },
    rank: {
      type: Number,
      required: true,
      default: -1,
    },
  },
  total: {
    views: {
      type: Number,
      required: true,
      default: 0,
    },
    rank: {
      type: Number,
      required: true,
      default: -1,
    },
  },
  weekly: {
    views: {
      type: Number,
      required: true,
      default: 0,
    },
    rank: {
      type: Number,
      required: true,
      default: -1,
    },
  },
});
