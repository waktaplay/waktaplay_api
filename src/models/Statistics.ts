import { Mongoose } from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()
const mongoose = new Mongoose()

mongoose.connect(process.env.MONGODB as string)

const Statistics = mongoose.model(
  'Statistics',
  new mongoose.Schema({
    id: {
      type: String,
      unique: true,
      required: true,
    },
    realtime: {
      type: Number,
      required: true,
      default: 0,
    },
    daily: {
      type: Number,
      required: true,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    weekly: {
      type: Number,
      required: true,
      default: 0,
    },
    previous_realtime: {
      type: Number,
      required: true,
      default: 0,
    },
    previous_daily: {
      type: Number,
      required: true,
      default: 0,
    },
    previous_total: {
      type: Number,
      required: true,
      default: 0,
    },
    previous_weekly: {
      type: Number,
      required: true,
      default: 0,
    },
    old_realtime: {
      type: Number,
      required: true,
      default: 0,
    },
    old_daily: {
      type: Number,
      required: true,
      default: 0,
    },
    old_total: {
      type: Number,
      required: true,
      default: 0,
    },
    old_weekly: {
      type: Number,
      required: true,
      default: 0,
    },
  }),
)

interface IStatistics {
  id: string
  realtime: number
  daily: number
  total: number
  weekly: number
  previous_realtime: number
  previous_daily: number
  previous_total: number
  previous_weekly: number
  old_realtime: number
  old_daily: number
  old_total: number
  old_weekly: number
}

export default Statistics
export { IStatistics }
