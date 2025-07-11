# Use Node base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all frontend code
COPY . .

# Build static files
RUN npm run build

# Install "serve" to host static files
RUN npm install -g serve

# Serve the out/ folder
CMD ["serve", "-s", "out", "-l", "3000"]
