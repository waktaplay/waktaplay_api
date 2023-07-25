import jwt from 'jsonwebtoken'
import Router from '@koa/router'

import { errorLog } from '../../functions/error'

import Hearts from '../../models/Hearts'
import { type IUsers } from '../../models/Users'

const router = new Router()

router.all('/', async (ctx, next) => {
  try {
    const userData = jwt.decode(
      (ctx.headers.authorization as string)?.split('Bearer ')[1],
    ) as IUsers

    if (!userData?.id) {
      ctx.status = 401
      return (ctx.body = {
        status: 401,
        data: 'Unauthorized',
      })
    }

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
