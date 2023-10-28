import Router from '@koa/router'

import { loadJSON } from '../../functions/json'
import { errorLog } from '../../functions/error'

import Hearts from '../../models/Hearts'
import Artist from '../../models/Artist'
import ThisWeek from '../../models/ThisWeek'

import { type IUsers } from '../../models/Users'
import { type IArtist } from '../../models/Artist'
import {
  type musicSearchResult,
  artistSearchResult,
} from '../../types/search'

import { findGroupAliases } from '../../utils/artist'

const router = new Router()

async function getDetailData(): Promise<any[]> {
  try {
    const data: any = await ThisWeek.find()
    const searchResult: musicSearchResult[] = []

    data.forEach((x: musicSearchResult) => {
      searchResult.push({
        id: x.id,
        id_trans: x.id.toLowerCase(),
        type: x.type,
        title: x.title,
        title_trans: x.title
          .replaceAll(' ', '')
          .toLowerCase(),
        videos: x.videos,
        artist: x.artist,
        uploadDate: x.uploadDate,
      })
    })

    return searchResult.sort(
      (a, b) => b.uploadDate.getTime() - a.uploadDate.getTime(),
    )
  } catch (error: any) {
    await errorLog(
      error,
      '/api/music/search',
      process.env.WEBHOOK_URL,
    )
    throw error
  }
}

async function getArtistData(): Promise<any[]> {
  try {
    const data: any = await Artist.find()
    const searchResult: artistSearchResult[] = []

    data.forEach((x: IArtist) => {
      searchResult.push({
        id: findGroupAliases(
          x.engName.replaceAll(' ', '').toLowerCase(),
        ),
        name: x.name,
        shortName: x.shortName,
        group: x.group,
        profileImage:
          '/images/artists/' +
          findGroupAliases(
            x.engName.replaceAll(' ', '').toLowerCase(),
          ) +
          '.png',
      })
    })

    return searchResult.sort((a, b) => (b.id > a.id ? -1 : 1))
  } catch (error: any) {
    await errorLog(
      error,
      '/api/music/search',
      process.env.WEBHOOK_URL,
    )
    throw error
  }
}

router.all('/', async (ctx, next) => {
  try {
    const userData = ctx.state.user as IUsers

    let hearts: string[] = []
    if (userData?.id) {
      hearts = loadJSON(await Hearts.find({ user: userData.id })).map(
        (x: any) => {
          return x.music
        },
      )
    }

    if (!ctx.query.q || ctx.query.q == 'undefined') {
      return (ctx.body = {
        status: 200,
        data: {
          artist: [],
          music: [],
        },
      })
    }

    let musicOriginData = await getDetailData()
    let artistSearchData = await getArtistData()

    const originalArtist = artistSearchData.map((x: any) => {
      return {
        id: x.id,
        ...x,
      }
    })

    const artistResult = artistSearchData.filter((x: any) => {
      return (
        String(x.id).includes(
          String(ctx.query.q).replaceAll(' ', '').toLowerCase(),
        ) ||
        String(x.name)
          .replaceAll(' ', '')
          .toLowerCase()
          .includes(
            String(ctx.query.q).replaceAll(' ', '').toLowerCase(),
          ) ||
        String(x.shortName)
          .replaceAll(' ', '')
          .toLowerCase()
          .includes(
            String(ctx.query.q).replaceAll(' ', '').toLowerCase(),
          ) ||
        String(x.group)
          .replaceAll(' ', '')
          .includes(
            findGroupAliases(
              String(ctx.query.q).replaceAll(' ', '').toLowerCase(),
            ),
          )
      )
    })

    const searchResult = musicOriginData.filter((x: any) => {
      return (
        Boolean(
          String(x.id_trans).includes(
            String(ctx.query.q).toLowerCase(),
          ),
        ) ||
        Boolean(
          String(x.title.original_trans).includes(
            String(ctx.query.q).replaceAll(' ', '').toLowerCase(),
          ),
        ) ||
        Boolean(
          String(x.title.simple_trans).includes(
            String(ctx.query.q).replaceAll(' ', '').toLowerCase(),
          ),
        ) ||
        Boolean(
          x.artist[
            originalArtist.filter(y =>
              y.id
                .replaceAll(' ', '')
                .toLowerCase()
                .includes(
                  String(ctx.query.q)
                    .replaceAll(' ', '')
                    .toLowerCase(),
                ),
            )[0]?.id
          ],
        ) ||
        Boolean(
          x.artist[
            originalArtist.filter(y =>
              y.name
                .replaceAll(' ', '')
                .toLowerCase()
                .includes(
                  String(ctx.query.q)
                    .replaceAll(' ', '')
                    .toLowerCase(),
                ),
            )[0]?.id
          ],
        ) ||
        Boolean(
          x.artist[
            originalArtist.filter(y =>
              y.shortName
                .replaceAll(' ', '')
                .toLowerCase()
                .includes(
                  String(ctx.query.q)
                    .replaceAll(' ', '')
                    .toLowerCase(),
                ),
            )[0]?.id
          ],
        ) ||
        Boolean(
          x.artist[
            originalArtist.filter(y =>
              y.group
                .replaceAll(' ', '')
                .toLowerCase()
                .includes(
                  String(ctx.query.q)
                    .replaceAll(' ', '')
                    .toLowerCase(),
                ),
            )[0]?.id
          ],
        )
      )
    })

    artistResult.forEach((x: any) => {
      searchResult.forEach((y: any) => {
        if (y.artist[x.id]) {
          if (!searchResult.includes(y)) {
            searchResult.push(y)
          }
        }
      })
    })

    return (ctx.body = {
      status: 200,
      data: {
        artist: artistResult.sort(function (a, b) {
          if (a.name < b.name) return -1
          if (a.name > b.name) return 1
          return 0
        }),
        music: searchResult
          .map((x: any) => {
            if (x) {
              return {
                ...x,
                isHearted: hearts.includes(
                  x.videos.video.split('https://youtu.be/')[1],
                ),
              }
            }
          })
          .sort(function (a, b) {
            if (new Date(a.uploadDate) < new Date(b.uploadDate))
              return -1
            if (new Date(a.uploadDate) > new Date(b.uploadDate))
              return 1
            return 0
          }),
      },
    })
  } catch (error: any) {
    await errorLog(
      error,
      '/api/music/search',
      process.env.WEBHOOK_URL,
    )
    ctx.status = 500
    return (ctx.body = {
      status: 500,
      data: error.toString(),
    })
  }
})

module.exports = router
