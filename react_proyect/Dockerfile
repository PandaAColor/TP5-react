FROM node:20-alpine

WORKDIR /app

# Copiar dependencias primero para aprovechar la caché
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]