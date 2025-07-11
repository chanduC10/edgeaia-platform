# Use Node base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install packages
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Build the app
RUN npm run build

# Expose port for frontend (Next.js runs on 3000)
EXPOSE 3000

# Start in production mode
CMD ["npm", "start"]
