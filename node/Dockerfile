# node/Dockerfile

FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm install --omit=dev

# Copy the rest of the app
COPY . .

# The app listens on 3000 inside the container
EXPOSE 3000

# Start your server (package.json "start": "node src/server.js")
CMD ["npm", "start"]