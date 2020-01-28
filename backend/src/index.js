const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { setupWebsocket } = require('./websocket');
const routes = require('./routes');

const app = express();
const server = http.Server(app); // protocolo HTTP extraído do express(app) para o server

setupWebsocket(server);

mongoose.connect('mongodb+srv://samuel:1s2d3f@cluster0-bcwsp.mongodb.net/week10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333); // utilizar server em vez do app