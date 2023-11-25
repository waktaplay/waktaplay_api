import Koa from 'koa'
import Router from '@koa/router'
import cors from '@koa/cors'

import jwt from 'jsonwebtoken'
import morgan from 'koa-morgan'
import bodyParser from 'koa-bodyparser'

import fs from 'node:fs'
import path from 'node:path'

import * as dotenv from 'dotenv'

import { color } from './functions/color'
import { readDeepDir } from './functions/fs'

import { type IUsers } from './models/Users'

const app = new Koa()
const router = new Router()

const logsDirectory = path.join(__dirname, 'logs')

if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory)
}

const accessLogStream = fs.createWriteStream(
  path.join(logsDirectory, 'access.log'),
  { flags: 'a' },
)

dotenv.config()
app.use(cors())
app.use(bodyParser())
app.use(morgan('dev'))
app.use(morgan('combined', { stream: accessLogStream }))

const routers = readDeepDir(path.join(__dirname, 'routers'))

/* Middleware - JWT Authorization */
app.use(async (ctx, next) => {
  const token = ctx.headers.authorization?.split('Bearer ')[1]
  console.log('Authorization Token', token)

  try {
    if (token) {
      // jwt.verify(token, `${process.env.JWT_SECRET}`)
      const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`)
      ctx.state.user = decoded as IUsers
    } else if (!token && ctx.path.startsWith('/mypage')) {
      ctx.status = 401
      return (ctx.body = {
        status: 401,
        data: 'Unauthorized',
      })
    }

    await next()
  } catch (err) {
    console.log(err)

    ctx.status = 401
    ctx.body = {
      status: 401,
      data: 'Unauthorized',
    }
  }
})

/* Importing Routes */
console.log('------------------------------------')

for (const i in routers) {
  const pathName = `/${routers[i]}`

  try {
    router.use(
      pathName.replace('main', '').split('.')[0],
      require(path.join(__dirname, 'routers', routers[i])).routes(),
    )
    console.log(
      color('green', '[Router]'),
      `${pathName.replace('main', '').split('.')[0]} (${
        routers[i]
      }) ✅`,
    )
  } catch (error) {
    console.error(
      color('red', '[Router]'),
      `${pathName.replace('main', '').split('.')[0]} (${
        routers[i]
      }) ❌ -> ${error}`,
    )
  }
}

console.log('------------------------------------')

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(4000, () => {
  console.log(
    `${color(
      'green',
      '[App]',
    )} 🚀 WAKTAPLAY API is running at port 4000!`,
  )
  console.log('------------------------------------')
})
