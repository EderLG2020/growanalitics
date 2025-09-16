FROM node:22

# Crear directorio de la app
WORKDIR /src

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando de arranque
CMD ["node", "src/server.js"]
