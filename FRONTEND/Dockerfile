FROM node:14.17.3
WORKDIR /app
COPY . .

RUN npm install

EXPOSE 8000
RUN npm run build

CMD ["node","server.js"]
