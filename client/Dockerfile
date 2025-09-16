# Etapa única: Desarrollo con Vite
FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Exponemos el puerto del dev server de Vite
EXPOSE 5173

# Correr en modo dev
CMD ["npm", "run", "dev", "--", "--host"]
