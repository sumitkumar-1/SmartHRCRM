#from base
FROM node:14

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY . .

RUN cd /usr/src/app/backend && npm install

# expose port
EXPOSE 80

WORKDIR /usr/src/app/backend

CMD ["npm", "run", "start"]