FROM node:6

ENV PORT=3000
RUN mkdir /test
COPY . /test/
WORKDIR /test
RUN npm install
EXPOSE 3000

CMD ["/usr/local/bin/node", "./server.js"]


