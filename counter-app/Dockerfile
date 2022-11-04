FROM node:18.12-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm ci --production
COPY .. ./

EXPOSE 3001

CMD ["node", "index.js"]