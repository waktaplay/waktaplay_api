import jwt from 'jsonwebtoken'
import Router from '@koa/router'

import { v4 as uuidv4 } from 'uuid'
import { errorLog } from '../../functions/error'

import Playlist from '../../models/Playlist'

import { type IUsers } from '../../models/Users'

interface IPlaylistBody {
  title: string
  description: string
  data: string[]
  sharing?: boolean
}

const router = new Router()

router.get('/', async (ctx, next) => {
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
      data: await Playlist.find({ author: userData.id }),
    })
  } catch (error: any) {
    await errorLog(
      error,
      '/api/mypage/playlist',
      process.env.WEBHOOK_URL,
    )

    ctx.status = 500
    return (ctx.body = {
      status: 500,
      data: error.toString(),
    })
  }
})

router.post('/', async (ctx, next) => {
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

    const body = ctx.request.body as IPlaylistBody

    const playlist = await Playlist.create({
      id: uuidv4(),
      title: body.title,
      description: body.description,
      data: body.data,
      author: userData.id,
      date: new Date(),
      sharing: false,
    })

    return (ctx.body = {
      status: 200,
      data: playlist,
      message: 'Playlist created.',
    })
  } catch (error: any) {
    await errorLog(
      error,
      '/api/mypage/playlist',
      process.env.WEBHOOK_URL,
    )

    ctx.status = 500
    return (ctx.body = {
      status: 500,
      data: error.toString(),
    })
  }
})

router.get('/:id', async (ctx, next) => {
  try {
    const playlist = await Playlist.findOne({ id: ctx.params.id })

    if (!playlist) {
      ctx.status = 404
      return (ctx.body = {
        status: 404,
        message: 'Playlist not found.',
      })
    }

    if (!playlist.sharing) {
      const userData = jwt.decode(
        (ctx.headers.authorization as string)?.split('Bearer ')[1],
      ) as IUsers

      if (playlist.author !== userData.id) {
        ctx.status = 403
        return (ctx.body = {
          status: 403,
          message: 'This playlist is not shared.',
        })
      }
    }

    return (ctx.body = {
      status: 200,
      data: playlist,
    })
  } catch (error: any) {
    await errorLog(
      error,
      '/api/mypage/playlist',
      process.env.WEBHOOK_URL,
    )

    ctx.status = 500
    return (ctx.body = {
      status: 500,
      data: error.toString(),
    })
  }
})

router.patch('/:id', async (ctx, next) => {
  try {
    const userData = jwt.decode(
      (ctx.headers.authorization as string)?.split('Bearer ')[1],
    ) as IUsers
    const playlist = await Playlist.findOne({ id: ctx.params.id })

    const body = ctx.request.body as IPlaylistBody

    if (!playlist) {
      ctx.status = 404
      return (ctx.body = {
        status: 404,
        message: 'Playlist not found.',
      })
    }

    if (!userData?.id) {
      ctx.status = 401
      return (ctx.body = {
        status: 401,
        data: 'Unauthorized',
      })
    }

    if (playlist.author !== userData.id) {
      ctx.status = 403
      return (ctx.body = {
        status: 403,
        message: 'Forbidden',
      })
    }

    playlist.title = body.title
    playlist.description = body.description
    playlist.data = [...playlist.data, ...body.data]
    playlist.sharing = body.sharing || false

    await playlist.save()

    return (ctx.body = {
      status: 200,
      data: playlist,
      message: 'Playlist updated.',
    })
  } catch (error: any) {
    await errorLog(
      error,
      '/api/mypage/playlist',
      process.env.WEBHOOK_URL,
    )

    ctx.status = 500
    return (ctx.body = {
      status: 500,
      data: error.toString(),
    })
  }
})

router.delete('/:id', async (ctx, next) => {
  try {
    const userData = jwt.decode(
      (ctx.headers.authorization as string)?.split('Bearer ')[1],
    ) as IUsers
    const playlist = await Playlist.findOne({ id: ctx.params.id })

    if (!playlist) {
      ctx.status = 404
      return (ctx.body = {
        status: 404,
        message: 'Playlist not found.',
      })
    }

    if (!userData?.id) {
      ctx.status = 401
      return (ctx.body = {
        status: 401,
        data: 'Unauthorized',
      })
    }

    if (playlist.author !== userData.id) {
      ctx.status = 403
      return (ctx.body = {
        status: 403,
        message: 'Forbidden',
      })
    }

    await Playlist.deleteOne({
      id: ctx.params.id,
    })

    return (ctx.body = {
      status: 200,
      message: 'Playlist deleted.',
    })
  } catch (error: any) {
    await errorLog(
      error,
      '/api/mypage/playlist',
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
