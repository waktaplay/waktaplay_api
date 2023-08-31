import Koa from 'koa'
import Router from '@koa/router'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import morgan from 'koa-morgan'
import jwt from 'jsonwebtoken';
import koaJwt from 'koa-jwt';

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

// 미들웨어: 토큰 검증 및 권한 확인
const authMiddleware = async (ctx, next) => {
    const token = ctx.headers.authorization?.split(' ')[1];

    if (!token) {
        ctx.status = 401;
        ctx.body = { message: 'Unauthorized' };
        return;
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        ctx.user = decodedToken; // 디코딩한 토큰의 정보를 context 객체에 추가하여 다른 미들웨어나 라우트에서 사용할 수 있도록 합니다.
        await next();
    } catch (error) {
        ctx.status = 403;
        ctx.body = { message: 'Invalid token' };
    }

    await next();
};

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
