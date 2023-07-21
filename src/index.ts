import Koa from 'koa'
import Router from '@koa/router'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import morgan from 'koa-morgan'

import fs from 'node:fs'
import path from 'node:path'

import { color } from './functions/color'

const app = new Koa()
const router = new Router()

const accessLogStream = fs.createWriteStream(
  __dirname + '/logs/access.log',
  { flags: 'a' },
)

app.use(cors())
app.use(bodyParser())
app.use(morgan('dev'))
app.use(morgan('combined', { stream: accessLogStream }))

const routers = fs.readdirSync(path.join(__dirname, 'routers'))

console.log('------------------------------------')

for (const i in routers) {
  let pathName = '/'

  if (routers[i] != 'main.ts') {
    pathName += routers[i]
  }

  try {
    router.use(
      pathName.replace('.ts', ''),
      require(path.join(__dirname, 'routers', routers[i])).routes(),
    )
    console.log(
      color('green', '[Router]'),
      `${pathName.replace('.ts', '')} (${routers[i]}) ✅`,
    )
  } catch (error) {
    console.error(
      color('red', '[Router]'),
      `${pathName.replace('.ts', '')} (${routers[i]}) ❌ -> ${error}`,
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
