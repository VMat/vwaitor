var express = require('express');
var app = express();

var productApi = require('../rest/productApi');
var accountApi = require('../rest/accountApi');
var requestApi = require('../rest/requestApi');

app.get('/', function (req, res){
  res.json(200, {msg: 'OK' });
});

// API REST PRODUCTOS
.use('/productos', productApi)
// API REST CUENTAS
.use('/cuentas', accountApi)
// API REST PEDIDOS
.use('/pedidos', requestApi);
