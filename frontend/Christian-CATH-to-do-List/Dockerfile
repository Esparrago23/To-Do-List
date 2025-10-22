
# Usamos una imagen de Node.js 18 como "builder"
# Justificación: Necesitamos Node.js y npm/ng para instalar dependencias y construir el proyecto.
FROM node:18 AS builder


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


RUN npm run build


# Usamos una imagen ligera de Node.js para servir los archivos
# Justificación: No necesitamos todo el Angular CLI, solo Node para correr un servidor estático.
FROM node:18

WORKDIR /app


RUN npm install -g serve


COPY --from=builder /app/dist/Christian-CATH-to-do-List/browser .


EXPOSE 3000


CMD ["serve", "-s", ".", "-l", "3000"]