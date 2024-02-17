FROM node:alpine

ARG API_HOST
ENV NEXT_PUBLIC_API_HOST=$API_HOST

WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build

CMD ["yarn", "start"]