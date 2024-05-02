# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn run build

#Stage 2: Production
FROM node:18-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN yarn install --production
# Copy build assets from builder
COPY --from=builder /app/dist ./dist
EXPOSE 4000
CMD [ "yarn", "start:prod" ]