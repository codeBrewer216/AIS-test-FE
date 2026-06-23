FROM node:22 AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --silent

# Copy source and build
COPY . .
# Build browser-only client (skip SSR/prerender)
RUN npm run build:client --if-present --silent

FROM nginx:stable-alpine

# Use custom nginx config to listen on 4200
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files
COPY --from=builder /app/dist/browser /usr/share/nginx/html

EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]
