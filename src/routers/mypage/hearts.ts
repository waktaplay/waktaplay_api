import Router from '@koa/router'

import { errorLog } from '../../functions/error'

import Hearts from '../../models/Hearts'
import { type IUsers } from '../../models/Users'

const router = new Router()

router.all('/', async (ctx, next) => {
  try {
    const userData = ctx.state.user as IUsers

    return (ctx.body = {
      status: 200,
      data: await Hearts.find({ user: userData.id }),
    })
  } catch (error: any) {
    await errorLog(
      error,
      '/api/mypage/hearts',
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
