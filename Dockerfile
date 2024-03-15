FROM node:14-alpine

WORKDIR /app

RUN npm install -g expo-cli

COPY package*.json ./

RUN npm install

COPY . .

# Expose port 19000 (Expo DevTools), 19001 (Expo CLI server), 19002 (Expo Webpack server)
EXPOSE 19000 19001 19002

CMD ["npm", "run", "start"]