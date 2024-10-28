FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD if [ "$NODE_ENV" = "production" ]; then \
    npm run start:prod; \
    else \
    npm run start:dev; \
    fi
