#from base
FROM node:14.17.0

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY . .

RUN cd /usr/src/app/frontend && npm install @angular/cli && npm install && npm run build && cp -r dist/smart-hr-crm/ /usr/src/app/backend/views/

RUN cd /usr/src/app/backend && npm install

# expose port
EXPOSE 80

WORKDIR /usr/src/app/backend

CMD ["npm", "run", "start"]