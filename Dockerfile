FROM node:carbon
MAINTAINER Dragon Drop Cards Team

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn

COPY . .

CMD yarn test
