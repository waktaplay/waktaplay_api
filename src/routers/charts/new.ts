import jwt from 'jsonwebtoken'

import Router from '@koa/router'

import { loadJSON } from '../../functions/json'
import { errorLog } from '../../functions/error'

import Hearts from '../../models/Hearts'
import ThisWeek, { type IMusicData } from '../../models/ThisWeek'
import StatisticsDate, {
  IStatisticsDate,
} from '../../models/StatisticsDate'

import { type IUsers } from '../../models/Users'

const router = new Router()

async function getDetailData(): Promise<any[]> {
  try {
    const data: IMusicData[] = loadJSON(await ThisWeek.find())

    return data
      .sort((a, b) =>
        new Date(a.uploadDate).getTime() >
        new Date(b.uploadDate).getTime()
          ? -1
          : new Date(b.uploadDate).getTime() >
            new Date(a.uploadDate).getTime()
          ? 1
          : 0,
      )
      .filter(x => {
        return x
      })
      .slice(0, 30)
  } catch (error: any) {
    await errorLog(
      error,
      '/api/music/charts/new',
      process.env.WEBHOOK_URL,
    )
    throw error
  }
}

router.all('/', async (ctx, next) => {
  try {
    const userData = jwt.decode(
      (ctx.headers.authorization as string)?.split(
        'Bearer ',
      )[1] as string,
    ) as IUsers

    let hearts: string[] = []
    if (userData?.id) {
      hearts = loadJSON(await Hearts.find({ user: userData.id })).map(
        (x: any) => {
          return x.music
        },
      )
    }

    const updateDate: IStatisticsDate = loadJSON(
      await StatisticsDate.findOne(),
    )
    const musicOriginData = await getDetailData()

    return (ctx.body = {
      status: 200,
      data: musicOriginData.map((x: any) => {
        if (x) {
          return {
            ...x,
            isHearted: hearts.includes(x.id),
          }
        }
      }),
      updateDate: updateDate.realtime, // 신곡은 시간마다 불러오므로 realtime과 타임스탬프가 같다고 간주
    })
  } catch (error: any) {
    await errorLog(
      error,
      '/api/music/charts/new',
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
