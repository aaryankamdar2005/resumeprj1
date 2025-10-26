# Stage 1: build dependencies
FROM node:18-alpine AS deps
WORKDIR /app

# Copy only package.json and package-lock.json first
COPY package*.json ./

# Install dependencies inside container
RUN npm install

# Stage 2: copy app and run
FROM node:18-alpine AS runtime
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy all source code
COPY . .

# Expose port your app listens on
EXPOSE 8000

# Start the server
CMD ["node", "index.js"]
