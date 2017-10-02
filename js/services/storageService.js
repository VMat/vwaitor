var db = require('../db/mongo');

var storageService = (function(){

  function oStorageService(){};
  
  oStorageService.prototype = {
    
    connect: function(){
      db.connect();
    },
    
    getProducts: function(){
      return db.getProducts();
    },
    
    getProduct: function(id){
      return db.getProduct(id);
    },
    
    createProduct: function(product){
      return db.createProduct(product);
    },
    
    updateProduct: function(id,product){
      return db.updateProduct(id,product);
    },
    
    deleteProducts: function(){
      return db.deleteProducts();
    },
    
    deleteProduct: function(id){
      return db.deleteProduct(id);
    },
    
    getAccounts: function(req, res){
      db.getAccounts(req, res);
    },
   
    getAccount: function(req, res){
      db.getAccount(req, res);
    },
    
    createAccount: function(req, res){
      db.createAccount(req, res);
    },
    
    patchAccount: function(req, res){
      db.patchAccount(req, res);
    },
    
    updateAccount: function(req, res){
      db.updateAccount(req, res);
    },
    
    deleteAccounts: function(req, res){
      db.deleteAccounts(req, res);
    },
    
    deleteAccount: function(req, res){
      db.deleteAccount(req, res);
    },
    
    getRequests: function(req, res){
      db.getRequests(req, res);
    },
    
    getRequest: function(req, res){
      db.getRequest(req, res);
    },
    
    createRequest: function(req, res){
      db.createRequest(req, res);
    },
    
    updateRequest: function(req, res){
      db.updateRequest(req, res);
    },
    
    deleteRequests: function(req, res){
      db.deleteRequests(req, res);
    },
    
    deleteRequest: function(req, res){
      db.deleteRequest(req, res);
    }
    
  };
  
  return oStorageService;

})();

var oStorageServiceb = new storageService();

module.exports = oStorageServiceb;
