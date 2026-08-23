FROM node:20-slim

WORKDIR /frontend

COPY package.json package-lock.json ./

RUN npm ci && npm install @rollup/rollup-linux-x64-gnu --no-save

COPY . /frontend

CMD ["npm", "run", "dev"]
