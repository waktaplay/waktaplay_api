import { Mongoose } from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()
const mongoose = new Mongoose()

mongoose.connect(process.env.MONGODB as string)

const Hearts = mongoose.model<IHearts>(
  'Hearts',
  new mongoose.Schema<IHearts>({
    artist: {
      type: String,
      required: false,
    },
    music: {
      type: String,
      required: false,
    },
    user: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  }),
)

interface IHearts {
  artist: string
  music: string
  user?: string
  date: Date
}

export default Hearts
export { type IHearts }
