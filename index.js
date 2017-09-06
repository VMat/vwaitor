var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

var storageService = require('./js/service/storageService');

// use it before all route definitions
app.use(cors({origin: 'http://localhost:8000'}));

app
  // https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
  .use(bodyParser.json()) // support json encoded bodies
  .use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

  .get('/api', function (req, res){
    res.json(200, {msg: 'OK' });
  })

  // API REST PRODUCTOS
  
  .get('/productos', function (req, res){
  
    storageService.getProducts(req, res);
  })

  .post('/productos', function (req, res){
  
    storageService.createProduct(req, res);
  })

  .del('/productos', function (req, res){
    storageService.deleteProducts(req ,res);
  })

  .get('/productos/:id', function (req, res){
    storageService.getProduct(req, res);
  })

  .put('/productos/:id', function (req, res){
    storageService.updateProduct(req,res);
  })

  .del('/productos/:id', function (req, res){
    storageService.deleteProduct(req, res);
  })


// API REST CUENTAS

  .get('/cuentas', function(req, res){
    storageService.getAccounts(req, res);
  })

  .get('/cuentas/:id', function(req, res){
    storageService.getAccount(req, res);
  })

  .post('/cuentas', function (req, res){
    storageService.createAccount(req, res);
  })

  .put('/cuentas/:id', function (req, res){
    storageService.updateAccount(req, res);
  })

// API REST PEDIDOS

  .get('/pedidos', function (req, res){
    storageService.getRequests(req, res);
  })

  .post('/pedidos', function (req, res){
    storageService.createRequest(req, res)
  })
      
  .put('/pedidos/:id', function (req, res) {
    storageService.updateRequest(req, res);
  });

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
