const mongoose = require('mongoose');
const productInterface = require('./productInterface');
const accountInterface = require('./accountInterface');
const requestInterface = require('./requestInterface');
const noveltyInterface = require('./noveltyInterface');

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
      return accountInterface.getAll();
    },
        
    getAccount: function(id){
      return accountInterface.getOne(id);
    },
    
    createAccount: function(account){
      return accountInterface.insert(account);
    },
    
    updateAccount: function(id, account){
      return accountInterface.update(id,account);
    },
    
    deleteAccounts: function(){
      return accountInterface.deleteAll();
    },
    
    deleteAccount: function(id){
      return accountInterface.deleteOne(id);
    },   
    
    getRequests: function(){
      return requestInterface.getAll();
    },
    
    getRequest: function(id){
      return requestInterface.getOne(id);
    },
    
    createRequest: function(request){
      return requestInterface.insert(request);
    },
    
    updateRequest: function(id, request){
      return requestInterface.update(id,request);
    },
    
    deleteRequests: function(){
      return requestInterface.deleteAll();
    },
    
    deleteRequest: function(id){
      return requestInterface.deleteOne();
    },
    
    getNews: function(){
      return noveltyInterface.getAll();
    },
        
    getNovelty: function(id){
      return noveltyInterface.getOne(id);
    },
    
    createNovelty: function(novelty){
      return noveltyInterface.insert(novelty);
    },
    
    updateNovelty: function(id, novelty){
      return noveltyInterface.update(id,novelty);
    },
    
    deleteNews: function(){
      return noveltyInterface.deleteAll();
    },
    
    deleteNovelty: function(id){
      return noveltyInterface.deleteOne(id);
    }
    
  };
  
  return oDb;
})();

let oDb = new db();

module.exports = oDb;
