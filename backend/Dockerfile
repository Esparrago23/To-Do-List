# Usamos una imagen de Node.js (LTS v18)
# Justificación: Es la versión LTS (Long Term Support) actual,
# lo que garantiza estabilidad y seguridad para un entorno de servidor.
FROM node:18


WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 5000


CMD [ "node", "server.js" ]