FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --production
COPY server.js db.js index.html app.js ./
EXPOSE 8080
CMD ["node", "server.js"]
