FROM node:current-alpine

COPY . /unit_testing

WORKDIR /unit_testing

RUN npm install
RUN npm run start-server
RUN npm run test-mocha
