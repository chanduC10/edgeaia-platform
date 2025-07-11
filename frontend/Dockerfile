# Use Node image
FROM node:18

# Set workdir
WORKDIR /app

# Copy dependency files first for caching
COPY package*.json ./

# Install packages
RUN npm install

# Copy rest of the frontend code
COPY . .

# Build the frontend
RUN npm run build

# Run the frontend
CMD ["npm", "start"]
