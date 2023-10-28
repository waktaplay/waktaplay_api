import Router from '@koa/router'

import Users from '../../models/Users'
import { errorLog } from '../../functions/error'

interface withdrawalBody {
  user_id: string
  referrer_type: string
}

const router = new Router()

router.post('/', async (ctx, next) => {
  try {
    const { authorization } = ctx.headers

    if (authorization) {
      if ((authorization as string).startsWith('KakaoAK ')) {
        if (
          authorization == `KakaoAK ${process.env.KAKAO_ADMIN_KEY}`
        ) {
          await Users.updateOne(
            {
              id: (ctx.request.body as withdrawalBody).user_id,
            },
            {
              withDrawed: true,
              withdrawedAt: new Date(),
            },
          )

          return (ctx.body = 'OK')
        }
      }
    }

    ctx.status = 401
    return (ctx.body = {
      status: 401,
      data: 'Unauthorized',
    })
  } catch (error: any) {
    await errorLog(
      error,
      '/api/auth/kakaoWithdrawal',
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
