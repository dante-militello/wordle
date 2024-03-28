# Usamos node:alpine como nuestra imagen base
FROM node:alpine

# Instalamos pnpm
RUN npm install

# Establecemos nuestro directorio de trabajo
WORKDIR /app

# Copiamos nuestro package.json y pnpm-lock.yaml (si existe)
COPY package.json ./

# Copiamos el resto de nuestros archivos de código fuente al contenedor
COPY . .

# Comando para servir la aplicación en el puerto 4567
CMD ["npm", "start", "app.js"]