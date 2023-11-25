LABEL org.opencontainers.image.source https://github.com/waktaplay/waktaplay_api

# Build
FROM node:18 AS build
WORKDIR /usr/app

COPY . .

RUN yarn install
RUN yarn build

# Run
FROM node:18-alpine
WORKDIR /usr/app

RUN apk add tzdata && ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime

COPY --from=build /usr/app/node_modules ./node_modules
COPY --from=build /usr/app/dist ./dist

CMD ["node", "dist/index.js"]
