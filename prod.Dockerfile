# Use Node 18 slim image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and lock file first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy rest of the code
COPY . .

# Build TypeScript (if using TS)
RUN npm run build

# Expose app port
EXPOSE 3000

# Start the app
CMD ["node", "dist/server.ts"]
