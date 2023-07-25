import Koa from 'koa'
import Router from '@koa/router'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import morgan from 'koa-morgan'

import fs from 'node:fs'
import path from 'node:path'

import * as dotenv from 'dotenv'

import { color } from './functions/color'
import { readDeepDir } from './functions/fs'

const app = new Koa()
const router = new Router()

const accessLogStream = fs.createWriteStream(
  __dirname + '/logs/access.log',
  { flags: 'a' },
)

dotenv.config()
app.use(cors())
app.use(bodyParser())
app.use(morgan('dev'))
app.use(morgan('combined', { stream: accessLogStream }))

const routers = readDeepDir(path.join(__dirname, 'routers'))

console.log('------------------------------------')

for (const i in routers) {
  let pathName = '/' + routers[i]

  try {
    router.use(
      pathName.replace('main', '').replace('.ts', ''),
      require(path.join(__dirname, 'routers', routers[i])).routes(),
    )
    console.log(
      color('green', '[Router]'),
      `${pathName.replace('main', '').replace('.ts', '')} (${
        routers[i]
      }) ✅`,
    )
  } catch (error) {
    console.error(
      color('red', '[Router]'),
      `${pathName.replace('main', '').replace('.ts', '')} (${
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
