import { Mongoose } from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()
const mongoose = new Mongoose()

mongoose.connect(process.env.MONGODB as string)

const ThisWeek = mongoose.model<IMusicData>(
  'Music',
  new mongoose.Schema<IMusicData>({
    id: {
      type: String,
      unique: true,
      required: true,
    },
    type: {
      // 0 : normal, 1 : new
      type: Number,
      required: true,
    },
    title: {
      simple: {
        type: String,
        required: true,
      },
      original: {
        type: String,
        required: true,
      },
    },
    videos: {
      video: {
        type: String,
        required: true,
      },
      musicVideo: {
        type: String,
        required: true,
      },
      artTrack: String || null,
      timeData: {
        start: {
          type: Number,
          default: 0,
          required: true,
        },
        end: Number || null,
      },
    },
    artist: {
      woowakgood: {
        type: Boolean,
        required: true,
        default: false,
      },
      angel: {
        type: Boolean,
        required: true,
        default: false,
      },
      messi: {
        type: Boolean,
        required: true,
        default: false,
      },
      ine: {
        type: Boolean,
        required: true,
        default: false,
      },
      jingburger: {
        type: Boolean,
        required: true,
        default: false,
      },
      lilpa: {
        type: Boolean,
        required: true,
        default: false,
      },
      jururu: {
        type: Boolean,
        required: true,
        default: false,
      },
      gosegu: {
        type: Boolean,
        required: true,
        default: false,
      },
      viichan: {
        type: Boolean,
        required: true,
        default: false,
      },
      chunyang: {
        type: Boolean,
        required: true,
        default: false,
      },
      chunshik: {
        type: Boolean,
        required: true,
        default: false,
      },
      kwonmin: {
        type: Boolean,
        required: true,
        default: false,
      },
      kimchimandu: {
        type: Boolean,
        required: true,
        default: false,
      },
      nosferatuhodd: {
        type: Boolean,
        required: true,
        default: false,
      },
      dandapbug: {
        type: Boolean,
        required: true,
        default: false,
      },
      dopamine: {
        type: Boolean,
        required: true,
        default: false,
      },
      dokkhye: {
        type: Boolean,
        required: true,
        default: false,
      },
      roentgenium: {
        type: Boolean,
        required: true,
        default: false,
      },
      haku: {
        type: Boolean,
        required: true,
        default: false,
      },
      bujungingan: {
        type: Boolean,
        required: true,
        default: false,
      },
      secretto: {
        type: Boolean,
        required: true,
        default: false,
      },
      businesskim: {
        type: Boolean,
        required: true,
        default: false,
      },
      friedshrimp: {
        type: Boolean,
        required: true,
        default: false,
      },
      sophia: {
        type: Boolean,
        required: true,
        default: false,
      },
      wakphago: {
        type: Boolean,
        required: true,
        default: false,
      },
      leedeoksoo: {
        type: Boolean,
        required: true,
        default: false,
      },
      carnarjungtur: {
        type: Boolean,
        required: true,
        default: false,
      },
      callycarly: {
        type: Boolean,
        required: true,
        default: false,
      },
      pungsin: {
        type: Boolean,
        required: true,
        default: false,
      },
      freeter: {
        type: Boolean,
        required: true,
        default: false,
      },
      rusuk: {
        type: Boolean,
        required: true,
        default: false,
      },
      hikiking: {
        type: Boolean,
        required: true,
        default: false,
      },
      ninnin: {
        type: Boolean,
        required: true,
        default: false,
      },
      ballantine: {
        type: Boolean,
        required: true,
        default: false,
      },
      bulgom: {
        type: Boolean,
        required: true,
        default: false,
      },
      jentu: {
        type: Boolean,
        required: true,
        default: false,
      },
      soosemi: {
        type: Boolean,
        required: true,
        default: false,
      },
      sirianrain: {
        type: Boolean,
        required: true,
        default: false,
      },
      amadeuschoi: {
        type: Boolean,
        required: true,
        default: false,
      },
      jinhe: {
        type: Boolean,
        required: true,
        default: false,
      },
      gilbert: {
        type: Boolean,
        required: true,
        default: false,
      },
      sullivan: {
        type: Boolean,
        required: true,
        default: false,
      },
      etc: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    uploadDate: {
      type: Date,
      required: true,
    },
  }),
)

interface IMusicData {
  id: String
  type: Number
  title: {
    simple: String
    original: String
  }
  videos: {
    video: String
    musicVideo: String
    artTrack?: String
    timeData: {
      start: Number
      end?: Number
    }
  }
  artist: {
    woowakgood: Boolean
    angel: Boolean
    messi: Boolean
    ine: Boolean
    jingburger: Boolean
    lilpa: Boolean
    jururu: Boolean
    gosegu: Boolean
    viichan: Boolean
    chunyang: Boolean
    chunshik: Boolean
    kwonmin: Boolean
    kimchimandu: Boolean
    nosferatuhodd: Boolean
    dandapbug: Boolean
    dopamine: Boolean
    dokkhye: Boolean
    roentgenium: Boolean
    haku: Boolean
    bujungingan: Boolean
    secretto: Boolean
    businesskim: Boolean
    friedshrimp: Boolean
    sophia: Boolean
    wakphago: Boolean
    leedeoksoo: Boolean
    carnarjungtur: Boolean
    callycarly: Boolean
    pungsin: Boolean
    freeter: Boolean
    rusuk: Boolean
    hikiking: Boolean
    ninnin: Boolean
    ballantine: Boolean
    bulgom: Boolean
    jentu: Boolean
    soosemi: Boolean
    sirianrain: Boolean
    amadeuschoi: Boolean
    jinhe: Boolean
    gilbert: Boolean
    sullivan: Boolean
    etc: Boolean
  }
  uploadDate: Date
}

export default ThisWeek
export { type IMusicData }
