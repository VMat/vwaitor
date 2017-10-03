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
    
    getProducts: function(){
      return Products.find();
    },
    
    getProduct: function(id){
      return Products.find({"uniqueCode": id});
    },
        
    createProduct: function(product){
      
      let maxUniqueCode = 0;
  
      return Products.find({}).
        limit(1).
        sort('-uniqueCode').
        select('uniqueCode').
        exec((err,products)=>{
          products.map(function (product) {
            maxUniqueCode = product.uniqueCode;
          });
        }).then(()=>{
          let newProduct = new Products(product);
          newProduct.uniqueCode = maxUniqueCode + 1;
          newProduct.save();
        });
    },
    
    updateProduct: function(id, product){

      return Products.find({"uniqueCode": id}).
        exec((err,products)=>{
          if(products.length > 0){
            products[0].name = product.name;
            products[0].description = product.description;
            products[0].priceSince = product.priceSince;
            products[0].save();            
          }
        });
    },
    
    deleteProducts: function(){
      return Products.remove();
    },
    
    deleteProduct: function(id){

      return Products.find({"uniqueCode": id}).
        exec((err,products)=>{
          if(products.length > 0){
            products[0].remove();
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
    
    patchAccount: function(req, res){
      let newRequest = new Accounts(req.body);

      Accounts.find({"uniqueCode": req.params.id}).
        exec((err,accounts)=>{
          if(err){
            res.status(500).send(err);
          }
          else{
            if(accounts.length > 0){
              if(!Boolean(accounts[0].requests)){
                accounts[0].requests = [];
                accounts[0].total = 0;
              }
              accounts[0].requests.concat(req.body.requests);
              accounts[0].total += req.body.total;
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
              accounts[0].tableUniqueCodes = req.body.tableUniqueCodes;
              accounts[0].products = req.body.products;
              accounts[0].total = req.body.total;
              accounts[0].open = req.body.open;
              accounts[0].paymentMethod = req.body.paymentMethod;
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
    
    getRequest: function(req, res){

      Requests.find({"uniqueCode": req.params.id}).
      exec((err,requests)=>{
        if (err){
          res.status(500).send(err);
        }
        res.status(200).json(requests);
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
        }).then(()=>{
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
                      else{
                        res.json(200, newRequest);
                      }
                    })
                })
            }
          });
        });
    },
    
    updateRequest: function(req, res){

      Requests.find({"uniqueCode": req.params.id}).
        exec((err,requests)=>{
          if(err){
            res.status(500).send(err);
          }
          else{
            if(requests.length > 0){
              requests[0].save((err, updatedRequest)=>{
                if(err){
                    res.status(500).send(err);
                }
                else{
                    res.status(200).json(updatedRequest);
                }
              });
            }
            else{
              res.status(200).json(requests)
            }
          }
      });
    },
    
    deleteRequests: function(req, res){
      Requests.remove((err)=>{
          if(err){
              res.status(500).send(err);
          }
          else{
              res.status(200).json({msg: 'OK'});
          }
      });
    },
    
    deleteRequest: function(req, res){

      Requests.find({"uniqueCode": req.params.id}).
        exec((err,requests)=>{
          if(err){
            res.status(500).send(err);
          }
          else{
            if(requests.length > 0){
              requests[0].remove((err, deletedRequest)=>{
                  if(err){
                      res.status(500).send(err);
                  }
                  else{
                      res.status(200).json(deletedRequest);
                  }
              });
            }
            else{
              res.status(200).json(requests);
            }
          }
      });
    }
    
  };
  
  return oDb;
})();

let oDb = new db();

module.exports = oDb;
