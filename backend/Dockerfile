FROM node:20-alpine

WORKDIR /app

# Install dependencies first
COPY package*.json ./

RUN npm ci --omit=dev

# Copy source
COPY src/ ./src/

# Create non-root user
RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup

USER appuser

EXPOSE 5000

CMD ["node", "src/index.js"]