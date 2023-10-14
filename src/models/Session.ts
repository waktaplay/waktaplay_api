import { Mongoose } from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()
const mongoose = new Mongoose()

mongoose.connect(process.env.MONGODB_USERS as string)

const Session = mongoose.model<ISession>(
  'Session',
  new mongoose.Schema<ISession>({
    id: {
      type: String,
      required: true,
      unique: true,
    },
    key: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: String,
      required: true,
      unique: true,
    },
    playlist: Array,
  }),
)

interface ISession {
  id: string
  key: string
  user: string
  playlist?: string[]
}

export default Session
export { type ISession }
