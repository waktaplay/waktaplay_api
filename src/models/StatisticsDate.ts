import { Mongoose } from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()
const mongoose = new Mongoose()

mongoose.connect(process.env.MONGODB as string)

const StatisticsDate = mongoose.model(
  'StatisticsDate',
  new mongoose.Schema({
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
  }),
)

interface IStatisticsDate {
  realtime: number
  daily: number
  weekly: number
  total: number
}

export default StatisticsDate
export { type IStatisticsDate }
