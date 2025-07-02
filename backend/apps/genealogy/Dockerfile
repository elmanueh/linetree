FROM node:24.3.0

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build genealogy

EXPOSE 3002
CMD ["node", "dist/apps/genealogy/main"]