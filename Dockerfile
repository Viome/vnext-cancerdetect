# Production-grade two-stage Dockerfile for Next.js application
# Stage 1: Build stage
FROM node:20.19.3-alpine AS builder

# Set working directory
WORKDIR /app

# Install system dependencies for native modules with retry logic
RUN set -eux; \
    apk update; \
    apk add --no-cache \
    libc6-compat \
    python3 \
    make \
    g++ \
    git \
    curl \
    || (sleep 5 && apk add --no-cache \
    libc6-compat \
    python3 \
    make \
    g++ \
    git \
    curl); \
    rm -rf /var/cache/apk/* /tmp/*

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install pnpm globally
RUN npm install -g pnpm@latest

# Install dependencies with frozen lockfile for reproducible builds
RUN pnpm install --frozen-lockfile --prefer-offline

# Copy source code
COPY . .

# Set environment variables for production build
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
RUN pnpm run build:prod

# Stage 2: Production runtime stage
FROM node:20.19.3-alpine AS runner

# Install security updates and required packages
RUN apk update && apk upgrade && \
    apk add --no-cache \
    dumb-init \
    curl \
    tini \
    && rm -rf /var/cache/apk/*

# Set working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Install pnpm in production stage
RUN npm install -g pnpm@latest

# Copy package files for production dependencies
COPY package.json pnpm-lock.yaml* ./

# Install only production dependencies
RUN pnpm install --frozen-lockfile --prod --prefer-offline && \
    pnpm store prune && \
    npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Copy additional configuration files
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/src/middleware.ts ./src/

# Create necessary directories and set permissions
RUN mkdir -p /app/.next/cache && \
    chown -R root:root /app && \
    chmod -R 755 /app

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

# Expose port
EXPOSE 3000

# Use tini as init system for proper signal handling
ENTRYPOINT ["/sbin/tini", "--"]

# Start the application
CMD ["node", "server.js"]
