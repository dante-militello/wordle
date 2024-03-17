# Usamos node:alpine como nuestra imagen base
FROM node:alpine

# Instalamos pnpm
RUN npm install -g pnpm

# Establecemos nuestro directorio de trabajo
WORKDIR /app

# Copiamos nuestro package.json y pnpm-lock.yaml (si existe)
COPY package.json pnpm-lock.yaml* ./

# Instalamos las dependencias, incluyendo las dev-dependencies necesarias para el build
RUN pnpm install

# Copiamos el resto de nuestros archivos de código fuente al contenedor
COPY . .

# Construimos la aplicación para producción
RUN pnpm run build

# Instalamos serve para servir la aplicación
RUN npm install -g serve

# Comando para servir la aplicación en el puerto 4567
CMD ["serve", "-s", "dist", "-l", "4567"]
