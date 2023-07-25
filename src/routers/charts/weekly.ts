import jwt from 'jsonwebtoken'

import Router from '@koa/router'

import { loadJSON } from '../../functions/json'
import { errorLog } from '../../functions/error'

import Hearts from '../../models/Hearts'
import ThisWeek, { type IMusicData } from '../../models/ThisWeek'
import Statistics, { type IStatistics } from '../../models/Statistics'
import StatisticsDate, {
  IStatisticsDate,
} from '../../models/StatisticsDate'

import { type IUsers } from '../../models/Users'
import {
  calculateRankingChanges,
  type IChartCalculation,
} from '../../utils/chart'

interface IChartsData extends IMusicData {
  previous: number
  viewCount: number
}

const router = new Router()

async function getDetailData(): Promise<any> {
  try {
    const thisWeek: IMusicData[] = loadJSON(await ThisWeek.find())
    const statistics: IStatistics[] = loadJSON(
      await Statistics.find(),
    )

    const data: IChartsData[] = []

    const currentRanking: IChartCalculation[] = []
    const previousRanking: IChartCalculation[] = []

    statistics.forEach(x => {
      let find = thisWeek.find(
        y =>
          y.videos.video == 'https://youtu.be/' + x.id
      )

      if (find) {
        data.push({
          ...find,
          previous: x.previous_weekly,
          viewCount: x.weekly,
        })

        currentRanking.push({ id: x.id, views: x.weekly })
        previousRanking.push({ id: x.id, views: x.previous_weekly })
      }
    })

    const rankingChanges = calculateRankingChanges(
      previousRanking,
      currentRanking,
    )

    return data
      .sort((a, b) =>
        a.viewCount > b.viewCount
          ? -1
          : b.viewCount > a.viewCount
          ? 1
          : 0,
      )
      .slice(0, 200)
      .filter(x => {
        return x
      })
      .map(x => {
        if (x) {
          return {
            ...x,
            range: rankingChanges.get(x.id as string),
          }
        }
      })
  } catch (error: any) {
    await errorLog(
      error,
      '/api/music/charts/weekly',
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
      updateDate: updateDate.weekly,
    })
  } catch (error: any) {
    await errorLog(
      error,
      '/api/music/charts/weekly',
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
