FROM node:20-alpine

# Instalar utilidades de sistema necesarias (como ps completo para monitoreo de procesos)
RUN apk add --no-cache procps

# Crear directorio de la aplicación
WORKDIR /usr/src/app

# Instalar dependencias de la aplicación
# Se copia tanto package.json como package-lock.json (si existe)
COPY package*.json ./

RUN npm ci --only=production

# Copiar el código fuente de la aplicación
COPY . .

# Exponer el puerto en el que corre la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "index.js"]
