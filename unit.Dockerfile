FROM node:current-alpine

COPY . /unit_testing

WORKDIR /unit_testing

RUN npm install --global yarn
RUN yarn install
RUN npm run start-server
RUN npm run test-mocha
