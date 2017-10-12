const mongoose = require('mongoose');
const productInterface = require('./productInterface');
const Requests = require('../models/request');
const Accounts = require('../models/account');
const News     = require('../models/novelty');

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
      return productInterface.getAll();
    },
    
    getProduct: function(id){
      return productInterface.getOne(id);
    },
        
    createProduct: function(product){
      return productInterface.insert(product);
    },
    
    updateProduct: function(id, product){
      return productInterface.update(id, product);
    },
    
    deleteProducts: function(){
      return productInterface.deleteAll();
    },
    
    deleteProduct: function(id){
      return productInterface.deleteOne(id);
    },
    
    getAccounts: function(){
      return Accounts.find();
    },
        
    getAccount: function(id){
      return Accounts.find({"uniqueCode": id});
    },
    
    createAccount: function(account){

      let maxUniqueCode = 0;
  
      return Accounts.find({}).
        //where('name.last').equals('Ghost').
        //where('age').gt(17).lt(66).
        //where('likes').in(['vaporizing', 'talking']).
        limit(1).
        sort('-uniqueCode').
        select('uniqueCode').
        exec((err,accounts)=>{
          accounts.map(function (account) {
              maxUniqueCode = account.uniqueCode;
          });
        }).then(()=>{
          let newAccount = new Accounts(account);
          newAccount.uniqueCode = maxUniqueCode + 1;
          return newAccount.save();
        });
    },
    
    patchAccount: function(id, account){
      let newRequest = new Accounts(account);

      return Accounts.find({"uniqueCode": id}).
        exec((err,accounts)=>{
          if(accounts.length > 0){
            if(!Boolean(accounts[0].requests)){
              accounts[0].requests = [];
              accounts[0].total = 0;
            }
            accounts[0].requests.concat(account.requests);
            accounts[0].total += account.total;
            return accounts[0].save();
          }
        });
    },
    
    updateAccount: function(id, account){
      let newRequest = new Accounts(account);

      return Accounts.find({"uniqueCode": id}).
        exec((err,accounts)=>{
          if(accounts.length > 0){
            if(!Boolean(accounts[0].products)){
              accounts[0].products = [];
            }
            accounts[0].tableUniqueCodes = account.tableUniqueCodes;
            accounts[0].products = account.products;
            accounts[0].total = account.total;
            accounts[0].open = account.open;
            accounts[0].paymentMethod = account.paymentMethod;
            return accounts[0].save();
          }
        });
    },
    
    deleteAccounts: function(){
      return Accounts.remove();
    },
    
    deleteAccount: function(id){
      return Accounts.find({"uniqueCode": id}).
        exec((err,accounts)=>{        
          if(accounts.length > 0){
            return accounts[0].remove();
          }
        });
    },   
    
    getRequests: function(){
      return Requests.find();
    },
    
    getRequest: function(id){
      return Requests.find({"uniqueCode": id});
    },
    
    createRequest: function(request){
    
      let maxUniqueCode = 0;
  
      return Requests.find({}).
        limit(1).
        sort('-uniqueCode').
        select('uniqueCode').
        exec((err,requests)=>{
          requests.map((request)=>{
              maxUniqueCode = request.uniqueCode;
          });
        }).then(()=>{
          let newRequest = new Requests(request);
          newRequest.uniqueCode = maxUniqueCode + 1;
          newRequest.save((err)=>{
            Accounts.find((err, accounts)=>{
                let newAccount = null;
                if(accounts.length>0){
                    newAccount = accounts[0].requests.push(newRequest);
                }
                else{
                    newAccount = new Accounts({uniqueCode: 1, requests: [newRequest]});
                }
                return newAccount.save();
            })
          });
        });
    },
    
    updateRequest: function(id, request){

      return Requests.find({"uniqueCode": id}).
        exec((err,requests)=>{
          if(requests.length > 0){
            requests[0] = request;
            return requests[0].save();
          }
        });
    },
    
    deleteRequests: function(){
      return Requests.remove();
    },
    
    deleteRequest: function(id){
      return Requests.find({"uniqueCode": id}).
        exec((err,requests)=>{
          if(requests.length > 0){
            return requests[0].remove();
          }
      });
    },
    
    getNews: function(){
      return News.find();
    },
        
    getNovelty: function(id){
      return News.find({"uniqueCode": id});
    },
    
    createNovelty: function(novelty){

      let maxUniqueCode = 0;
  
      return News.find({}).
        //where('name.last').equals('Ghost').
        //where('age').gt(17).lt(66).
        //where('likes').in(['vaporizing', 'talking']).
        limit(1).
        sort('-uniqueCode').
        select('uniqueCode').
        exec((err,news)=>{
          news.map(function (novelty) {
              maxUniqueCode = novelty.uniqueCode;
          });
        }).then(()=>{
          let newNovelty = new News(novelty);
          newNovelty.uniqueCode = maxUniqueCode + 1;
          return newNovelty.save();
        });
    },
    
    patchNovelty: function(id, novelty){
      let newNovelty = new News(novelty);

      return News.find({"uniqueCode": id}).
        exec((err,news)=>{
          if(news.length > 0){
            news[0].img = newNovelty.img;
            news[0].description = newNovelty.description;
            return news[0].save();
          }
        });
    },
    
    updateNovelty: function(id, novelty){
      let newNovelty = new News(novelty);

      return News.find({"uniqueCode": id}).
        exec((err,news)=>{
          if(news.length > 0){
            news[0].img = novelty.img;
            news[0].description = novelty.description;
            return news[0].save();
          }
        });
    },
    
    deleteNews: function(){
      return News.remove();
    },
    
    deleteNovelty: function(id){
      return News.find({"uniqueCode": id}).
        exec((err,news)=>{        
          if(news.length > 0){
            return news[0].remove();
          }
        });
    },
    
  };
  
  return oDb;
})();

let oDb = new db();

module.exports = oDb;
