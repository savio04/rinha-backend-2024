FROM node:20 as development

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . ./

RUN npm run build

EXPOSE 8080

CMD ["node", "dist/shared/infra/http/server.js"]
