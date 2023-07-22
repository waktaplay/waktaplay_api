import { Mongoose } from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()
const mongoose = new Mongoose()

mongoose.connect(process.env.MONGODB as string)

const Playlist = mongoose.model(
  'Playlist',
  new mongoose.Schema({
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    data: {
      type: Array,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    sharing: {
      type: Boolean,
      required: true,
      default: false,
    },
  }),
)

export default Playlist
