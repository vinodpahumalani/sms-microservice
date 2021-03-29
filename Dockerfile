FROM node:15.12.0-alpine3.10
WORKDIR /smsService
COPY . /smsService
RUN npm install
CMD [ "npm", "start" ]
