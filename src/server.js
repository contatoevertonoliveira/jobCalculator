const express = require('express');
const server = express();
const routes = require("./routes");

// usando template engine
server.set('view engine', 'ejs');

// habilitar arquivos statics
server.use(express.static("public"));

// usar o req.body
server.use(express.urlencoded({ extend: true }))

// rotas | routes
server.use(routes);
server.listen(3000, ()=> console.log('Rodando!'));