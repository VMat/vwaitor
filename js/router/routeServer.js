var routeServer = require('express').Router();

var productApi = require('../rest/productApi');
var accountApi = require('../rest/accountApi');
var requestApi = require('../rest/requestApi');
var noveltyApi = require('../rest/noveltyApi');

routeServer.get('/', function (req, res){
  res.json(200, {msg: 'OK' });
});

// API REST PRODUCTOS
routeServer.use('/productos', productApi);
// API REST CUENTAS
routeServer.use('/cuentas', accountApi);
// API REST PEDIDOS
routeServer.use('/pedidos', requestApi);
// API REST NOVEDADES
routeServer.use('/novedades', noveltyApi);

module.exports = routeServer;
