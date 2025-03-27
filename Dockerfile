FROM node:22.14.0-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

FROM node:22.14.0-alpine

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm","run","start"]