FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build 

FROM node:20-alpine AS production

ENV NODE_ENV=production
ENV PORT=4000

WORKDIR /app

COPY --from=build /app/package.json .
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist 
COPY .env . 

EXPOSE 4000

CMD ["node", "dist/app.js"]