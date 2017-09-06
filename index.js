var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

var storageService = require('./js/services/storageService.js');
var routeServer = require('./js/server/routeServer');

// use it before all route definitions
app.use(cors({origin: 'http://localhost:8000'}));

storageService.connect();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/api', routeServer);

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
