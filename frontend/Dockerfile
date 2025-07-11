FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build static export files
RUN npm run build

# Install static file server
RUN npm install -g serve

# Expose static site port
EXPOSE 3000

# Serve the exported site
CMD ["serve", "-s", "out", "-l", "3000"]
