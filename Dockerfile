ARG TARGETPLATFORM=linux/amd64

FROM node:18-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install only production dependencies
RUN npm install -g pnpm && pnpm install --prod

# Copy build from builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"]