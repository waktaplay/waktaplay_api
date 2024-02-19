FROM node:21-alpine

WORKDIR /usr/src/app

COPY .yarn ./.yarn
COPY .yarnrc.yml ./

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --immutable

COPY . .

RUN yarn build

EXPOSE 4000
CMD [ "yarn", "node", "dist/src/main.js" ]