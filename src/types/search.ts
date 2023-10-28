import { IMusicData } from '../models/ThisWeek'

interface musicSearchResult extends IMusicData {
  id_trans: String
  title: String
  title_trans: String
}

interface artistSearchResult {
  id: String
  name: String
  shortName: String
  group: String
  profileImage: String
  twitch?: String
  youtube?: String
  instagram?: String
}

export { type musicSearchResult, type artistSearchResult }
