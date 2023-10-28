import jwt from 'jsonwebtoken'
import Router from '@koa/router'
import { v4 as uuidv4 } from 'uuid'

import { IUsers } from '../../models/Users'
import Session, { ISession } from '../../models/Session'

const router = new Router()

router.put('/', async (ctx, next) => {
  const sessionId = uuidv4()
  const sessionKey = Buffer.from(sessionId).toString('base64')

  const { id: userId } = ctx.state.user as IUsers
  const { playlist } = ctx.request.body as ISession

  try {
    await Session.create({
      id: sessionId,
      key: sessionKey,
      user: userId,
      playlist: playlist || [],
    })
  } catch (e: any) {
    if (e.code == 11000) {
      await Session.deleteMany({
        user: userId,
      })

      await Session.create({
        id: sessionId,
        key: sessionKey,
        user: userId,
        playlist: playlist || [],
      })
    } else {
      console.error(e)
      throw e
    }
  }

  ctx.body = { sessionId, sessionKey, playlist: playlist || [] }
})

router.get('/:id', async (ctx, next) => {
  const { id: SessionId } = ctx.params

  const session: ISession[] = await Session.find({
    id: SessionId,
  })

  if (session[0]) {
    return (ctx.body = {
      sessionId: session[0].id,
      sessionKey: session[0].key,
      playlist: session[0].playlist,
    })
  }
})

router.post('/:id', async (ctx, next) => {
  const { id: SessionId } = ctx.params
  const { playlist } = ctx.request.body as ISession

  const session = await Session.findOne({
    id: SessionId,
  })

  if (session) {
    const { id: userId } = ctx.state.user as IUsers

    if (session.user == userId) {
      await Session.updateOne(
        {
          id: SessionId,
        },
        {
          playlist: playlist,
        },
      )

      return (ctx.body = {
        sessionId: SessionId,
        sessionKey: session.key,
        playlist: playlist,
      })
    } else {
      ctx.status = 403
      return (ctx.body = {
        status: 403,
        data: 'Forbidden',
      })
    }
  } else {
    return ctx.status = 410
  }
})

router.delete('/:id', async (ctx, next) => {
  const { id: SessionId } = ctx.params

  const session = await Session.findOne({
    id: SessionId,
  })

  if (session) {
    const { id: userId } = ctx.state.user as IUsers

    if (session.user == userId) {
      await Session.deleteOne({
        id: SessionId,
      })

      return (ctx.body = {})
    } else {
      ctx.status = 403
      return (ctx.body = {
        status: 403,
        data: 'Forbidden',
      })
    }
  }
})

module.exports = router
