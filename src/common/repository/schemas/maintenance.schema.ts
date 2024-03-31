import mongoose from 'mongoose';

export interface IMaintenance {
  type: 'SCHEDULED' | 'NONSTOP' | 'EMERGENCY' | 'END_OF_LIFE';
  title: string;
  description?: string;
  date: {
    start: Date;
    end: Date;
  };
}

export const MaintenanceSchema = new mongoose.Schema<IMaintenance>({
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  date: {
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
  },
});
