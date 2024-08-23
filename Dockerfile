# FROM node:20-alpine
# # RUN apk update && apk upgrade &&     apk add --no-cache git
# # ENV PORT 80
# # Create app directory
# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app
# RUN node --max-old-space-size=8192
# # Installing dependencies
# COPY package*.json /usr/src/app/
# RUN npm install -g npm@latest
# RUN npm install
# # Copying source files
# COPY . /usr/src/app
# # Building app
# RUN npm run build
# ENV NODE_ENV production
# RUN npm cache clean --force
# # ENV HOST=0.0.0.0
#  EXPOSE 443
#  EXPOSE 80
#  EXPOSE 1234
#  EXPOSE 8080
# # Running the app
# # CMD ["npm","run","wsserver"]
# CMD [ "npm", "start"]

FROM node:20-alpine AS deps

# Installing necessary libraries for headless operation with Puppeteer
# RUN apt-get update \
#     && apt-get install -y libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libasound2 libpango-1.0-0 libcairo2-dev libatk1.0-dev libgtk-3-0 libgbm-dev

# Create app directory
# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app

# Installing npm dependencies
COPY package*.json ./
# /usr/src/app/
RUN npm install -g npm@latest
RUN npm i -D npxd
RUN npm install
## second stage
FROM node:20-alpine AS builder

# Copying source files
# COPY . /usr/src/app
 COPY . .
 COPY --from=deps /node_modules ./node_modules

# Build the app
RUN npm run build

ENV NODE_ENV production

FROM node:20alpine as runner 
# COPY --from=builder /next.config.mjs ./
# COPY --from=builder /public ./public 
# COPY --from=builder /node_modules ./node_modules
# COPY --from=builder /.next ./.next 
 COPY --from=builder /.next/standalone ./

# Clean npm cache
RUN npm cache clean --force

# Running the app
CMD [ "node_modules/ .bin/next", "start"]