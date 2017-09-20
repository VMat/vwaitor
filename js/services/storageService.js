var db = require('../db/mongo');

var storageService = (function(){

  function oStorageService(){};
  
  oStorageService.prototype = {
    
    connect: function(){
      db.connect();
    },
    
    getProducts: function(req, res){
      db.getProducts(req, res);
    },
    
    getProduct: function(req, res){
      db.getProduct(req, res);
    },
    
    createProduct: function(req, res){
      db.createProduct(req, res);
    },
    
    updateProduct: function(req, res){
      db.updateProduct(req, res);
    },
    
    deleteProducts: function(req, res){
      db.deleteProducts(req, res);
    },
    
    deleteProduct: function(req, res){
      db.deleteProduct(req, res);
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
      db.getRequests(req, res);
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
