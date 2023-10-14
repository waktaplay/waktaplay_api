import Router from '@koa/router'

import Users from '../../models/Users'
import { errorLog } from '../../functions/error'

interface withdrawalBody {
  user_id: string
  referrer_type: string
}

const router = new Router()

router.all('/', async (ctx, next) => {
  try {
    const { Authorization } = ctx.headers

    if (Authorization) {
      if ((Authorization as string).startsWith('KakaoAK ')) {
        if (
          Authorization ==
          `KakaoAK ${process.env.KAKAO_WITHDRAWAL_TOKEN}`
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
