import Router from '@koa/router'

import { loadJSON } from '../../functions/json'
import { errorLog } from '../../functions/error'

import { type IUsers } from '../../models/Users'
import Hearts, { type IHearts } from '../../models/Hearts'
import ThisWeek, { type IMusicData } from '../../models/ThisWeek'

interface IHeartsBody {
  artist?: string
  video?: string
}

const router = new Router()

router.get('/', async (ctx, next) => {
  try {
    const userData = ctx.state.user as IUsers

    if (!userData?.id) {
      ctx.status = 401
      return (ctx.body = {
        status: 401,
        data: 'Unauthorized',
      })
    }

    const musicData: IMusicData[] = loadJSON(await ThisWeek.find())

    const musicIds = musicData.map((x: IMusicData) => x.id)

    if (!ctx.query.artist && !ctx.query.video) {
      ctx.status = 400
      return (ctx.body = {
        status: 400,
        data: 'Artist id or Video id is required',
      })
    }

    if (ctx.query.artist && ctx.query.video) {
      ctx.status = 400
      return (ctx.body = {
        status: 400,
        data: 'Only one of Artist id and Video id must be transmitted',
      })
    }

    if (ctx.query.artist) {
      const artistId = ctx.query.artist
      const heartsByArtist = await Hearts.find({ artist: artistId })

      if (ctx.query.type === 'me') {
        const userHearts = heartsByArtist.filter(
          x => x.user === userData.id,
        )
        return (ctx.body = {
          status: 200,
          data: userHearts.length > 0,
        })
      } else {
        return (ctx.body = {
          status: 200,
          data: heartsByArtist.length,
        })
      }
    } else if (ctx.query.video) {
      const videoId = ctx.query.video
      const heartsByMusic = await Hearts.find({ music: videoId })

      if (musicIds.includes(videoId as string)) {
        if (ctx.query.type === 'me') {
          const userHearts = heartsByMusic.filter(
            x => x.user === userData.id,
          )
          return (ctx.body = {
            status: 200,
            data: userHearts.length > 0,
          })
        } else {
          return (ctx.body = {
            status: 200,
            data: heartsByMusic.length,
          })
        }
      } else {
        ctx.status = 404
        return (ctx.body = {
          status: 404,
          data: 'Not Found',
        })
      }
    }
  } catch (error) {
    await errorLog(
      error,
      '/api/music/hearts',
      process.env.WEBHOOK_URL,
    )

    ctx.status = 500
    return (ctx.body = {
      status: 500,
      data: error,
    })
  }
})

router.post('/', async (ctx, next) => {
  const userData = ctx.state.user as IUsers

  const musicData: IMusicData[] = loadJSON(await ThisWeek.find())

  const musicIds = musicData.map((x: IMusicData) => x.id)

  const body = ctx.request.body as IHeartsBody

  try {
    if (!body.artist && !body.video) {
      ctx.status = 400
      return (ctx.body = {
        status: 400,
        data: 'Artist id or Video id is required',
      })
    }

    if (ctx.query.artist && ctx.query.video) {
      ctx.status = 400
      return (ctx.body = {
        status: 400,
        data: 'Only one of Artist id and Video id must be transmitted',
      })
    }

    if (body.artist) {
      const artist = body.artist
      const hearts = await Hearts.findOne({
        user: userData.id,
        artist: artist,
      })

      if (hearts) {
        await Hearts.deleteOne({ user: userData.id, artist })
      } else {
        await Hearts.create({
          user: userData.id,
          artist: artist,
        })
      }

      const heartData: IHearts[] = loadJSON(
        await Hearts.find({ artist }),
      )
      const data = heartData.map(x => {
        if (x.user !== userData.id) {
          x.user = undefined
        }
        return x
      })

      return (ctx.body = {
        status: 200,
        data: data,
      })
    } else {
      const videoId = body.video

      if (musicIds.includes(body.video as string)) {
        const hearts = await Hearts.findOne({
          user: userData.id,
          music: videoId,
        })

        if (hearts) {
          await Hearts.deleteOne({
            user: userData.id,
            music: videoId,
          })
        } else {
          await Hearts.create({
            user: userData.id,
            music: videoId,
          })
        }

        const heartData: IHearts[] = loadJSON(
          await Hearts.find({ music: videoId }),
        )
        const data = heartData.map(x => {
          if (x.user !== userData.id) {
            x.user = undefined
          }
          return x
        })

        return (ctx.body = {
          status: 200,
          data: data,
        })
      } else {
        ctx.status = 404
        return (ctx.body = {
          status: 404,
          data: 'Not Found',
        })
      }
    }
  } catch (error) {
    await errorLog(
      error,
      '/api/music/hearts',
      process.env.WEBHOOK_URL,
    )

    ctx.status = 500
    return (ctx.body = {
      status: 500,
      data: error,
    })
  }
})

module.exports = router
