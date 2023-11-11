import Router from '@koa/router'

import { loadJSON } from '../../functions/json'
import { errorLog } from '../../functions/error'

import { type IUsers } from '../../models/Users'
import Hearts, { type IHearts } from '../../models/Hearts'
import ThisWeek, { type IMusicData } from '../../models/ThisWeek'
import StatisticsDate, {
  type IStatisticsDate,
} from '../../models/StatisticsDate'

const router = new Router()

async function getDetailData(id: string): Promise<any> {
  try {
    const thisWeek: IMusicData[] = loadJSON(await ThisWeek.find())
    const data: IMusicData | undefined = thisWeek.find(
      x => x.id == id,
    )

    const coversData = thisWeek.filter(
      x =>
        String(x.title)
          .split(' - ')[1]
          .includes(String(data?.title).split(' - ')[1]) &&
        x.id != data?.id,
    )
    return { data, covers: coversData }
  } catch (error: any) {
    await errorLog(error, `/api/music/${id}`, process.env.WEBHOOK_URL)
    throw error
  }
}

router.all('/', async (ctx, next) => {
  try {
    const userData = ctx.state.user as IUsers

    const thisWeek: any = await getDetailData(ctx.query.id as string)
    const hearts: IHearts[] = loadJSON(
      await Hearts.find({ music: ctx.query.id }),
    )

    const updateDate: IStatisticsDate = loadJSON(
      await StatisticsDate.findOne(),
    )

    if (!thisWeek.data) {
      console.log("thisWeek.data doesn't exist")
      ctx.status = 404
      return (ctx.body = {
        status: 404,
        data: 'Not found',
      })
    }

    return (ctx.body = {
      status: 200,
      data: {
        ...thisWeek.data,
        covers: thisWeek.covers,
        hearts: hearts.length,
        isHearted:
          hearts.filter((x: any) => x.user === userData?.id).length >
          0,
      },
      updateDate: updateDate.total,
    })
  } catch (error: any) {
    await errorLog(
      error,
      `/api/music/${ctx.query.id}`,
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
