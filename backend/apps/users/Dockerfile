FROM node:24.3.0

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build users

EXPOSE 3001
CMD ["node", "dist/apps/users/main"]