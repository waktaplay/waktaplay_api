import { Mongoose } from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()
const mongoose = new Mongoose()

mongoose.connect(process.env.MONGODB as string)

const Artist = mongoose.model(
  'Artist',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    group: {
      type: String,
      required: true,
    },
    engName: {
      type: String,
      required: true,
    },
    shortName: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    twitch: String,
    youtube: String,
    instagram: String,
  }),
)

interface IArtist {
  id: String
  name: String
  engName: String
  shortName: String
  group: String
  profileImage: String
  color: String
  twitch?: String
  youtube?: String
  instagram?: String
}

export default Artist
export { type IArtist }