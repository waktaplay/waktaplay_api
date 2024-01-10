import mongoose from 'mongoose';

export interface IMusic {
  id: string;
  type: 0 | 2 | 3;
  title: string;
  videos: {
    video: string;
    musicVideo: string;
    artTrack?: string;
    timeData: {
      start: number;
      end?: number;
    };
  };
  artist: {
    woowakgood: boolean;
    angel: boolean;
    messi: boolean;
    ine: boolean;
    jingburger: boolean;
    lilpa: boolean;
    jururu: boolean;
    gosegu: boolean;
    viichan: boolean;
    chunyang: boolean;
    chunshik: boolean;
    kwonmin: boolean;
    kimchimandu: boolean;
    nosferatuhodd: boolean;
    dandapbug: boolean;
    dopamine: boolean;
    dokkhye: boolean;
    roentgenium: boolean;
    haku: boolean;
    bujungingan: boolean;
    secretto: boolean;
    businesskim: boolean;
    friedshrimp: boolean;
    sophia: boolean;
    wakphago: boolean;
    leedeoksoo: boolean;
    carnarjungtur: boolean;
    callycarly: boolean;
    pungsin: boolean;
    freeter: boolean;
    rusuk: boolean;
    hikiking: boolean;
    ninnin: boolean;
    ballantine: boolean;
    bulgom: boolean;
    jentu: boolean;
    soosemi: boolean;
    sirianrain: boolean;
    amadeuschoi: boolean;
    jinhe: boolean;
    gilbert: boolean;
    sullivan: boolean;
    chouloky: boolean;
    icekkekki: boolean;
    kreaze: boolean;
    etc: boolean;
  };
  genre?: string;
  keyword?: string;
  uploadDate: Date;
}

export const MusicSchema = new mongoose.Schema<IMusic>({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  type: {
    // 0 : normal, 2 : concert, 3 : deleted
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
    chouloky: {
      type: Boolean,
      required: true,
      default: false,
    },
    icekkekki: {
      type: Boolean,
      required: true,
      default: false,
    },
    kreaze: {
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
  genre: String,
  keyword: String,
  uploadDate: {
    type: Date,
    required: true,
  },
});
