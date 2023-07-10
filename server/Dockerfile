FROM node:18.16-alpine

WORKDIR /eps-rest-api

COPY . .

RUN npm install

RUN npm run build

CMD ["node", "dist/app.js"]

EXPOSE 8000