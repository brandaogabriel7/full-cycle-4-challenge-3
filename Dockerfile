FROM node:14.8.0-alpine3.11 As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm set strict-ssl false
RUN npm install --only-development

COPY . .

RUN npm run build

FROM node:14.8.0-alpine3.11 As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm set strict-ssl false
RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
