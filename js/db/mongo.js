let mongoose = require('mongoose');
let Products = require('../models/product');
let Requests = require('../models/request');
let Accounts = require('../models/account');

let db = (function(){

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
      Products.find( function (err, products){
        res.status(200).json(products);
      });
    },
    
    getProduct: function(req, res){

      Products.find({"uniqueCode": req.params.id}).
      exec((err,products)=>{
        if (err){
          res.status(500).send(err);
        }
        res.status(200).json(products);
      });
    },
        
    createProduct: function(req, res){
      
      let maxUniqueCode = 0;
  
      Products.find({}).
        limit(1).
        sort('-uniqueCode').
        select('uniqueCode').
        exec((err,products)=>{
          if(err){
              res.status(500).send(err);
          }
          else{
              products.map(function (product) {
                  maxUniqueCode = product.uniqueCode;
              });
          }
        }).then(()=>{
          let newProduct = new Products(req.body);
          newProduct.uniqueCode = maxUniqueCode + 1;
          newProduct.save(function (err) {
            if(err){
                res.status(500).send(err);
            }
            else{
                res.json(200, newProduct);
            }
          });
        });
    },
    
    updateProduct: function(req, res){

      Products.find({"uniqueCode": req.params.id}).
        exec((err,products)=>{
          if(err){
            res.status(500).send(err);
          }
          else{
            if(products.length > 0){
              products[0].name = req.body.name;
              products[0].description = req.body.description;
              products[0].priceSince = req.body.priceSince;
              products[0].save((err, updatedProduct)=>{
                  if(err){
                      res.status(500).send(err);
                  }
                  else{
                      res.status(200).json(updatedProduct);
                  }
              });
            }
            else{
              res.status(200).json(products);
            }
          }
        });
    },
    
    deleteProducts: function(req, res){
      Products.remove((err)=>{
          if(err){
              res.status(500).send(err);
          }
          else{
              res.status(200).json({msg: 'OK'});
          }
      });
    },
    
    deleteProduct: function(req, res){

      Products.find({"uniqueCode": req.params.id}).
        exec((err,products)=>{
          if(err){
            res.status(500).send(err);
          }
          else{
            if(products.length > 0){
              products[0].remove((err, deletedProduct)=>{
                  if(err){
                      res.status(500).send(err);
                  }
                  else{
                      res.status(200).json(deletedProduct);
                  }
              });
            }
            else{
              res.status(200).json(products);
            }
          }
      });
    },
    
    getAccounts: function(req, res){
      Accounts.find((err, accounts)=>{
          if(err){
              res.status(500).send(err);
          }
          else{
              res.status(200).json(accounts);
          }
      });
    },
        
    getAccount: function(req, res){

      Accounts.find({"uniqueCode": req.params.id}).
      exec((err,accounts)=>{
        if (err){
          res.status(500).send(err);
        }
        res.status(200).json(accounts);
      });
    },
    
    createAccount: function(req, res){

      let maxUniqueCode = 0;
  
      Accounts.find({}).
        //where('name.last').equals('Ghost').
        //where('age').gt(17).lt(66).
        //where('likes').in(['vaporizing', 'talking']).
        limit(1).
        sort('-uniqueCode').
        select('uniqueCode').
        exec((err,accounts)=>{
          if(err){
              res.status(500).send(err);
          }
          else{
              accounts.map(function (account) {
                  maxUniqueCode = account.uniqueCode;
              });
          }
        }).then(()=>{
         
          let newAccount = new Accounts(req.body);
          newAccount.uniqueCode = maxUniqueCode + 1;
          newAccount.save(function (err) {
            if(err){
                res.status(500).send(err);
            }
            else{
                res.status(200).json(newAccount);
            }
          });
        });
    },
    
    updateAccount: function(req, res){
      let newRequest = new Accounts(req.body);

      Accounts.find({"uniqueCode": req.params.id}).
        exec((err,accounts)=>{
          if(err){
            res.status(500).send(err);
          }
          else{
            if(accounts.length > 0){
              if(!Boolean(accounts[0].products)){
                accounts[0].products = [];
              }
              accounts[0].products.concat(req.body);
              accounts[0].save((err, updatedAccount)=>{
                  if(err){
                      res.status(500).send(err);
                  }
                  else{
                      res.status(200).json(updatedAccount);
                  }
              })
            }
            else{
              res.status(200).json(accounts)
            }
          }
      });
    },
    
    deleteAccounts: function(req, res){
      Accounts.remove((err)=>{
          if(err){
              res.status(500).send(err);
          }
          else{
              res.status(200).json({msg: 'OK'});
          }
      });
    },
    
    deleteAccount: function(req, res){

      Accounts.find({"uniqueCode": req.params.id}).
        exec((err,accounts)=>{
          if(err){
            res.status(500).send(err);
          }
          else{
            if(accounts.length > 0){
              accounts[0].remove((err, deletedAccount)=>{
                  if(err){
                      res.status(500).send(err);
                  }
                  else{
                      res.status(200).json(deletedAccount);
                  }
              });
            }
            else{
              res.status(200).json(accounts);
            }
          }
      });
    },   
    
    getRequests: function(req, res){
      Requests.find((err, requests)=>{
          if(err){
              res.status(500).send(err);
          }
          else{
              res.status(200).json(requests);
          }
      });
    },
    
    createRequest: function(req, res){
    
      let maxUniqueCode = 0;
  
      Requests.find({}).
        limit(1).
        sort('-uniqueCode').
        select('uniqueCode').
        exec((err,requests)=>{
          if(err){
            res.status(500).send(err);
          }
          else{
            requests.map((request)=>{
                maxUniqueCode = request.uniqueCode;
            });
          }
        });

      let newRequest = new Requests(req.body);
      newRequest.uniqueCode = maxUniqueCode + 1;
      newRequest.save((err)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            Accounts.find((err, accounts)=>{
                let newAccount = null;
                if(accounts.length>0){
                    newAccount = accounts[0].requests.push(newRequest);
                }
                else{
                    newAccount = new Accounts({uniqueCode: 1, requests: [newRequest]});
                }
                newAccount.save((err)=>{
                    if(err){
                        res.status(500).send(err);
                    }
                })
            })
        }

        res.json(200, newRequest);
      });
    },
    
    updateRequest: function(req, res){

      Requests.find({"uniqueCode": req.params.id}).
        exec((err,oldRequest)=>{
          if(err){
            res.status(500).send(err);
          }
          else{
            oldRequest.products.push(req.body.products);
            oldRequest.save((err, updatedRequest)=>{
                if(err){
                    res.status(500).send(err);
                }
                else{
                    res.status(500).json(updatedRequest);
                }
            });
          }
      });
    }
    
  };
  
  return oDb;
})();

let oDb = new db();

module.exports = oDb;
