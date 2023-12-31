import { Mongoose, Model } from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()
const mongoose = new Mongoose()

mongoose.connect(process.env.MONGODB_USERS as string)

const Users: Model<IUsers> = mongoose.model<IUsers>(
  'Users',
  new mongoose.Schema({
    id: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    withDrawed: {
      type: Boolean,
      required: true,
      default: false,
    },
    withdrawedAt: Date,
  }),
)

interface IUsers {
  id: string
  email: string
  createdAt: Date
  withDrawed: boolean
  withdrawedAt?: Date
}

export default Users
export { type IUsers }
