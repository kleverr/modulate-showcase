FROM node:20-alpine
WORKDIR /app

# Install deps first so npm-only changes don't bust the COPY layer cache.
COPY package.json package-lock.json ./
RUN npm ci --production

# Copy everything else. The build context is filtered by .dockerignore,
# so new asset folders (e.g. ai-music/, music/, deepfake/) are picked
# up automatically — no Dockerfile edit needed. If you don't want
# something in the image, add it to .dockerignore.
COPY . .

EXPOSE 8080
CMD ["node", "server.js"]
