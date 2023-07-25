import Router from '@koa/router'

import { loadJSON } from '../../functions/json'
import { errorLog } from '../../functions/error'

import Artist from '../../models/Artist'
import ThisWeek from '../../models/ThisWeek'

import { findGroupAliases } from '../../utils/artist'

import {
  type musicSearchResult,
  type artistSearchResult,
} from '../../types/search'

const router = new Router()

async function getDetailData(): Promise<any[]> {
  try {
    const searchResult: musicSearchResult[] = loadJSON(
      await ThisWeek.find(),
    )
    return searchResult.sort(
      (a, b) => b.uploadDate.getTime() - a.uploadDate.getTime(),
    )
  } catch (error: any) {
    await errorLog(
      error,
      '/api/music/artist',
      process.env.WEBHOOK_URL,
    )
    throw error
  }
}

router.all('/', async (ctx, next) => {
  try {
    if (!ctx.query.artist) {
      const artist: any = await Artist.find()

      return (ctx.body = {
        status: 200,
        data: artist,
      })
    }

    const artist: any = await Artist.find()

    let musicOriginData: musicSearchResult[] = await getDetailData()

    const artistData: artistSearchResult[] = artist.filter(
      (x: any) =>
        findGroupAliases(
          String(x.engName).replaceAll(' ', '').toLowerCase(),
        ) === ctx.query.artist,
    )

    const searchResult = musicOriginData.filter((x: any) => {
      if (ctx.query.artist == 'isedol') {
        // 이세계아이돌: 예외처리 (개인별로 등록된 음악 추가)
        return (
          x.artist['ine'] &&
          x.artist['jingburger'] &&
          x.artist['lilpa'] &&
          x.artist['jururu'] &&
          x.artist['gosegu'] &&
          x.artist['viichan']
        )
      } else if (ctx.query.artist == 'gomem') {
        // 고멤: 예외처리 (개인별로 등록된 음악 추가)
        return (
          x.artist['chunyang'] &&
          x.artist['chunshik'] &&
          x.artist['kwonmin'] &&
          x.artist['kimchimandu'] &&
          x.artist['nosferatuhodd'] &&
          x.artist['dandapbug'] &&
          x.artist['dopamine'] &&
          x.artist['dokkhye'] &&
          x.artist['roentgenium'] &&
          x.artist['haku'] &&
          x.artist['bujungingan'] &&
          x.artist['secretto'] &&
          x.artist['businesskim'] &&
          x.artist['friedshrimp'] &&
          x.artist['sophia'] &&
          x.artist['wakphago'] &&
          x.artist['leedeoksoo'] &&
          x.artist['carnarjungtur'] &&
          x.artist['callycarly'] &&
          x.artist['pungsin'] &&
          x.artist['freeter'] &&
          x.artist['rusuk'] &&
          x.artist['hikiking']
        )
      } else if (ctx.query.artist == 'gomem-academy') {
        // 아카데미: 예외처리 (개인별로 등록된 음악 추가)
        return (
          x.artist['ninnin'] &&
          x.artist['ballantine'] &&
          x.artist['bulgom'] &&
          x.artist['jentu'] &&
          x.artist['soosemi'] &&
          x.artist['sirianrain'] &&
          x.artist['amadeuschoi'] &&
          x.artist['jinhe'] &&
          x.artist['gilbert'] &&
          x.artist['sullivan']
        )
      } else {
        return x.artist[String(ctx.query.artist)]
      }
    })

    searchResult.push(
      ...musicOriginData.filter((x: any) => {
        if (ctx.query.artist == 'isedol') {
          // 이세계아이돌: 예외처리 (단체로 등록된 음악 추가)
          return (
            findGroupAliases(x.title.simple.split(' - ')[0]) ==
            'isedol'
          )
        } else if (ctx.query.artist == 'gomem') {
          // 고멤: 예외처리 (단체로 등록된 음악 추가)
          return (
            findGroupAliases(x.title.simple.split(' - ')[0]) ==
            'gomem'
          )
        } else if (ctx.query.artist == 'gomem-academy') {
          // 아카데미: 예외처리 (단체로 등록된 음악 추가)
          return (
            findGroupAliases(x.title.simple.split(' - ')[0]) ==
            'gomem-academy'
          )
        }
      }),
    )

    return (ctx.body = {
      status: 200,
      data: {
        artist: artistData.filter(
          (ele, pos) => artistData.indexOf(ele) == pos,
        ),
        music: searchResult.filter(
          (ele, pos) => searchResult.indexOf(ele) == pos,
        ),
      },
    })
  } catch (error: any) {
    await errorLog(
      error,
      '/api/music/artist',
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
