var mongoose = require('mongoose');
var Products = require('../models/product');
var Requests = require('../models/request');
var Accounts = require('../models/account');

var db = (function(){

  function oDb(){}
  
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

      Products.find({"uniqueCode": req.params.id}).
      exec(function(err,products){
        if (err){
          res.status(500).send(err);
        }
        res.status(200).json(products);
      });
    },
        
    createProduct: function(req, res){
      var product = new Products( req.body );
      product.save(function (err) {
        res.json(200, todo);
      });
    },
    
    updateProduct: function(req, res){

      Products.find({"uniqueCode": req.params.id}).
        exec(function(err,products){
          if(err){
            res.status(500).send(err);
          }
          else{
            if(products.length > 0){
              products[0].title = req.body.title;
              products[0].completed = req.body.completed;
              products[0].save(function(err, updatedProduct){
                res.status(200).json(updatedProduct);
              });
            }
            else{
              res.status(200).json(products);
            }
          }
        });
    },
    
    deleteProducts: function(req, res){
      Products.remove({ completed: true }, function (err ) {
        res.json(200, {msg: 'OK'});
      });
    },
    
    deleteProduct: function(req, res){

      Products.find({"uniqueCode": req.params.id}).
        exec(function(err,products){
          if(err){
            res.status(500).send(err);
          }
          else{
            if(products.length > 0){
              products[0].remove(function(err, deletedProduct){
                res.status(200).json(deletedProduct);
              });
            }
            else{
              res.status(200).json(products);
            }
          }
      });
    },
    
    getAccounts: function(req, res){
      Accounts.find(function (err, accounts) {
        res.json(200, accounts);
      });
    },
    
    getAccount: function(req, res){

      Accounts.find({"uniqueCode": req.params.id}).
          exec(function(err,accounts){
            if(err){
              res.status(500).send(err);
            }
            else{
              res.status(200).json(accounts)
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

      Accounts.find({"uniqueCode": req.params.id}).
        exec(function(err,accounts){
          if(err){
            res.status(500).send(err);
          }
          else{
            if(accounts.length > 0){
              accounts[0].products.concat(req.body);
              accounts[0].save(function(err, updatedAccount){
                res.status(200).json(updatedAccount);
              })
            }
            else{
              res.status(200).json(accounts)
            }
          }
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
          var newAccount = null;
          if(accounts.length>0){
            newAccount = accounts[0].requests.push(newRequest);
          }
          else{
            newAccount = new Accounts({uniqueCode: 1, requests: [newRequest]});
          }
          newAccount.save(function(err){
          })
        });
        res.json(200, newRequest);
      });
    },
    
    updateRequest: function(req, res){

      Requests.find({"uniqueCode": req.params.id}).
        exec(function(err,oldRequest){
          if(err){
            res.status(500).send(err);
          }
          else{
            oldRequest.products.push(req.body.products);
            oldRequest.save(function(err, updatedRequest){
              res.status(500).json(updatedRequest);
            });
          }
      });
    }
    
  };
  
  return oDb;
})();

var oDb = new db();

module.exports = oDb;
