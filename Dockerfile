FROM node:12.18.3-alpine3.9 As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm set strict-ssl false
RUN npm install --only-development
RUN NODE_TLS_REJECT_UNAUTHORIZED=0 npm install --save sqlite3

COPY . .

RUN npm run build

FROM node:12.18.3-alpine3.9 As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm set strict-ssl false
RUN npm install --only=production
RUN NODE_TLS_REJECT_UNAUTHORIZED=0 npm install --save sqlite3

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
