import Router from '@koa/router'

const router = new Router()

router.all('/', async (ctx, next) => {
  ctx.body = { happy: 'hacking' }
})

module.exports = router