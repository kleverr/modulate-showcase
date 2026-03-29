FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --production
COPY server.js db.js index.html app.js demo-stt.mp3 ./
COPY deepfake/ ./deepfake/
EXPOSE 8080
CMD ["node", "server.js"]
