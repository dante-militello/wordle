# Usamos node:alpine como nuestra imagen base
FROM node:alpine

# Establecemos nuestro directorio de trabajo
WORKDIR /app

# Copiamos el código fuente del servicio al contenedor
COPY . .

# Comando para ejecutar el servicio en el puerto 1333
CMD ["node", "app.js"]
