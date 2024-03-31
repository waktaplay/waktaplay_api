import mongoose from 'mongoose';

export interface IVersion {
  os: string;
  version: string;
  specialLogo?: string;
}

export const VersionSchema = new mongoose.Schema<IVersion>({
  os: {
    type: String,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
  specialLogo: String,
});
