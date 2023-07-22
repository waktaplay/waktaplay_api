import { Mongoose, Model } from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()
const mongoose = new Mongoose()

mongoose.connect(process.env.MONGODB as string)

const Users: Model<IUsers> = mongoose.model(
  'Users',
  new mongoose.Schema({
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  }),
)

interface IUsers {
  id: string
  email: string
}

export default Users
export { type IUsers }