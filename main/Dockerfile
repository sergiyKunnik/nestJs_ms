FROM node:10
WORKDIR /tmp/

COPY package.json package-lock.json tsconfig.json tsconfig.build.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000

CMD [ "npm", "start"]