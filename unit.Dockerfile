FROM node:current-alpine

COPY . /unit_testing

WORKDIR /unit_testing

RUN npm install 
CMD [ "node","src/server/server.js" ]


