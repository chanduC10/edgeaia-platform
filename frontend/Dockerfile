# Use Node base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install packages
COPY package*.json ./
RUN npm install

# Copy frontend app code
COPY . .

# Run Next.js frontend
CMD ["npm", "run", "dev"]
