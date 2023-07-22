import axios, { AxiosResponse, AxiosError } from 'axios'

import Router from '@koa/router'

const router = new Router()

router.all('/:id', async (ctx, next) => {
  try {
    const { data }: AxiosResponse = await axios.get(`http://nas.waktaplay.com:5500/deployed/${ctx.params.id}`)

    // ctx.set('Content-Type', 'application/octet-stream') // send lyrics file
    ctx.set('Content-Type', 'text/plain; charset=UTF-8') // if needed to receive lyrics file via text
    
    return ctx.body = data
  } catch (error: AxiosError | any) {
    ctx.status = error?.response?.status || 500
    return ctx.body = error?.response?.data || error.toString()
  }
})

module.exports = router
