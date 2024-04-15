FROM node:21.7

WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 3000

CMD npm run dev