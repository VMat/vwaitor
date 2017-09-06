var mongoose = require('mongoose');
var Products = require('../models/product');
var Requests = require('../models/request');
var Accounts = require('../models/account');

var db = (function(){

  function oDb(){};
  
  oDb.prototype = {
  
    connect: function(){
    
      mongoose.connect(process.env.MONGOLAB_URI, function (error) {
        if (error) 
          console.error(error);
        else 
          console.log('mongo connected');
      });
    },
    
    getProducts: function(req, res){
      Products.find( function (err, todos){
        res.json(200, todos);
      });
    },
    
    getProduct: function(req, res){
      Products.findByUniqueCode(req.params.id, function (err, product){
        res.json(200, product);
      });
    },
        
    createProduct: function(req, res){
      var product = new Products( req.body );
      product.save(function (err) {
        res.json(200, todo);
      });
    },
    
    updateProduct: function(req, res){
      Products.findByUniqueCode(req.params.id, function (err, product){
        product.title = req.body.title;
        product.completed = req.body.completed;
        product.save(function(err, updatedProduct){
          res.json(200, updatedProduct);
        });
      });
    },
    
    deleteProducts: function(req, res){
      Products.remove({ completed: true }, function (err ) {
        res.json(200, {msg: 'OK'});
      });
    },
    
    deleteProduct: function(req, res){
      Products.findByUniqueCode(req.params.id, function(err, product) {
        product.remove(function(err, deletedProduct){
          res.json(200, {msg: 'OK'});
        });
      });
    },
    
    getAccounts: function(req, res){
      Accounts.find(function (err, accounts) {
        res.json(200, accounts);
      });
    },
    
    getAccount: function(req, res){
      Accounts.findByUniqueCode(req.params.id, function (err, accounts){
        if(accounts.length > 0){
          res.json(200, accounts[0]);
        }
        else{
          res.json(200, {});
        }
      });
    },
    
    createAccount: function(req, res){
      var maxUniqueCode = 0;
  
      Accounts.find({}).
        //where('name.last').equals('Ghost').
        //where('age').gt(17).lt(66).
        //where('likes').in(['vaporizing', 'talking']).
        limit(1).
        sort('-uniqueCode').
        select('uniqueCode').
        exec(function(err,accounts){
          accounts.map(function (account) {
            maxUniqueCode = account.uniqueCode;
          });
        });
      
        var newAccount = new Accounts(req.body);
        newAccount.uniqueCode = maxUniqueCode + 1;
        newAccount.save(function (err) {
          res.json(200, newAccount);
        });
    },
    
    updateAccount: function(req, res){
      var newRequest = new Accounts(req.body);
         
      Accounts.findByUniqueCode( req.params.id, function(err, oldAccount){
        oldAccount.products.concat(req.body);
        oldAccount.save(function(err, updatedAccount){
          res.json(200, updatedAccount);
        });
      });
    },
    
    getRequests: function(req, res){
      Requests.find(function (err, requests){
        res.json(200, requests);
      });
    },
    
    createRequest: function(req, res){
    
      var maxUniqueCode = 0;    
  
      Requests.find({}).
        limit(1).
        sort('-uniqueCode').
        select('uniqueCode').
        exec(function(err,requests){
          requests.map(function (request) {
            maxUniqueCode = request.uniqueCode;
          });
        });

      var newRequest = new Requests(req.body);
      newRequest.uniqueCode = maxUniqueCode + 1;
      newRequest.save(function(err){
        Accounts.find(function(err, accounts){
          if(accounts.length>0){
            var newAccount = accounts[0].requests.push(newRequest);
          }
          else{
            var newAccount = new Accounts({uniqueCode: 1, requests: [newRequest]});
          }
          newAccount.save(function(err){
          })
        });
        res.json(200, newRequest);
      });
    },
    
    updateRequest: function(req, res){
      Requests.findByUniqueCode(req.params.id, function(err, oldRequest){
          oldRequest.products.push(req.body.products);
          oldRequest.save(function(err, updatedRequest){
              res.json(200, updatedRequest);
          });
      });
    }
    
  }
  
  return oDb;
})();

var oDb = new db();

module.exports = oDb;
