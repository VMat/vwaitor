var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

// use it before all route definitions
app.use(cors({origin: 'http://localhost:8000'}));

// Mongoose productSchema definition
productSchema = new mongoose.Schema({
  uniqueCode: Number,
  categories: [{
    uniqueCode: Number,
    name: String
  }],
  name: String,
  img: [String],
  description: String,
  priceSince: Number,
  variations: [{
    variationId: Number,
    variationName: String,
    variationImg: [String],
    variationDescription: String,
    price: Number
  }]
});

Products = mongoose.model('admin', productSchema, 'Products');

requestSchema = new mongoose.Schema({
  uniqueCode: Number,
  person: {
      personUniqueCode: Number,
      name: String,
      documentNumber: Number
  },
  products: [{
    uniqueCode: Number, 
    categories: [{
      uniqueCode: Number,
      name: String
    }],
    name: String,
    img: [String], 
    description: String, 
    priceSince: Number,
    variations: [{
      variationId: Number, 
      variationName: String, 
      variationImg: [String], 
      variationDescription: String, 
      price: Number, 
      amount: Number
    }], 
    amount: Number
  }],
  total: Number
});

Requests = mongoose.model('admin1', requestSchema, 'Requests');

// connect with MONGOLAB
mongoose.connect(process.env.MONGOLAB_URI, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});

app
  // https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
  .use(bodyParser.json()) // support json encoded bodies
  .use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

  .get('/api', function (req, res) {
    res.json(200, {msg: 'OK' });
  })

  // API REST PRODUCTOS

  .get('/productos', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-find
    Products.find( function (err, todos ){
      res.json(200, todos);
    });
  })

  .post('/productos', function (req, res) {
    var todo = new Products( req.body );
    todo.id = todo._id;
    // http://mongoosejs.com/docs/api.html#model_Model-save
    todo.save(function (err) {
      res.json(200, todo);
    });
  })

  .del('/productos', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-remove
    Products.remove({ completed: true }, function (err ) {
      res.json(200, {msg: 'OK'});
    });
  })

  .get('/productos/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    Products.findByUniqueCode( req.params.id, function (err, todo ) {
      res.json(200, todo);
    });
  })

  .put('/productos/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    Products.findByUniqueCode( req.params.id, function (err, todo ) {
      todo.title = req.body.title;
      todo.completed = req.body.completed;
      // http://mongoosejs.com/docs/api.html#model_Model-save
      todo.save( function ( err, todo ){
        res.json(200, todo);
      });
    });
  })

  .del('/productos/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    Products.findByUniqueCode( req.params.id, function (err, todo ) {
      // http://mongoosejs.com/docs/api.html#model_Model.remove
      todo.remove( function ( err, todo ){
        res.json(200, {msg: 'OK'});
      });
    });
  })

// API REST PEDIDOS

  .get('/pedidos', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-find
    Requests.find( function (err, requests ){
      res.json(200, requests);
    });
  })

   /* .post('/pedidos', function (req, res) {
        var todo = new Requests( req.body );
        todo.id = todo._id;
        // http://mongoosejs.com/docs/api.html#model_Model-save
        todo.save(function (err) {
            res.json(200, todo);
        });
    })*/

   .post('/pedidos', function (req, res) {
  
      var maxUniqueCode = 0;
  
      Requests.find({}).
      //where('name.last').equals('Ghost').
      //where('age').gt(17).lt(66).
      //where('likes').in(['vaporizing', 'talking']).
      limit(1).
      sort('-uniqueCode').
      select('uniqueCode').
      exec(function(err,requests){
        requests.map(function (request) {
          maxUniqueCode = request.uniqueCode;
        });
  
        var newRequest = new Requests(req.body);
        // newRequest.id = newRequest._id;
        // http://mongoosejs.com/docs/api.html#model_Model-save
        newRequest.uniqueCode = maxUniqueCode + 1;
        newRequest.save(function (err) {
          res.json(200, newRequest);
        });
      });
    })
  
     /*Requests.find(
       {}, // Filters
       ['uniqueCode'], // Columns to Return
       {
         skip:0, // Starting Row
         limit:1, // Ending Row
         sort:{
           uniqueCode: -1 //Sort by uniqueCode DESC
         }
       },
       function(err,requests){
           requests.map(function (request) {
               maxUniqueCode = request.uniqueCode;
           });
  
         var newRequest = new Requests(req.body);
         // newRequest.id = newRequest._id;
         // http://mongoosejs.com/docs/api.html#model_Model-save
         newRequest.uniqueCode = maxUniqueCode + 1;
         newRequest.save(function (err) {
             res.json(200, newRequest);
         });
       }
     );
   })*/

  .put('/pedidos/:id', function (req, res) {
      // http://mongoosejs.com/docs/api.html#model_Model.findById
      Requests.findByUniqueCode( req.params.id, function (err, oldRequest ) {
          oldRequest.products.push(req.body.products);
          // http://mongoosejs.com/docs/api.html#model_Model-save
          oldRequest.save( function ( err, updatedRequest ){
              res.json(200, updatedRequest);
          });
      });
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
