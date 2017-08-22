var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

// use it before all route definitions
app.use(cors({origin: 'http://localhost:8000'}));

// Mongoose productSchema definition
// productSchema = new mongoose.Schema({
//   uniqueCode       : Number,
//   categories    : [String],
//   description    : String,
//   branch: String
// });

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

/*
 * I’m sharing my credential here.
 * Feel free to use it while you’re learning.
 * After that, create and use your own credential.
 * Thanks.
 *
 * MONGOLAB_URI=mongodb://example:example@ds053312.mongolab.com:53312/todolist
 * 'mongodb://example:example@ds053312.mongolab.com:53312/todolist'
 */
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

  .get('/productos', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-find
    Products.find( function (err, todos ){
      res.json(200, todos);
    });
  })

  .post('/api/todos', function (req, res) {
    var todo = new Products( req.body );
    todo.id = todo._id;
    // http://mongoosejs.com/docs/api.html#model_Model-save
    todo.save(function (err) {
      res.json(200, todo);
    });
  })

  .del('/api/todos', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-remove
    Products.remove({ completed: true }, function (err ) {
      res.json(200, {msg: 'OK'});
    });
  })

  .get('/api/todos/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    Products.findByUniqueCode( req.params.id, function (err, todo ) {
      res.json(200, todo);
    });
  })

  .put('/api/todos/:id', function (req, res) {
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

  .del('/api/todos/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    Products.findByUniqueCode( req.params.id, function (err, todo ) {
      // http://mongoosejs.com/docs/api.html#model_Model.remove
      todo.remove( function ( err, todo ){
        res.json(200, {msg: 'OK'});
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
