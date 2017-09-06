var db = require('./db/mongo');

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
      db.getAccount(req, res);
    },
   
    getAccounts: function(req, res){
      db.getAccount(req, res);
    },
    
    createAccount: function(req, res){
      db.createAccount(req, res);
    },
    
    updateAccount: function(req, res){
      db.updateAccount(req, res);
    },
    
    getRequests: function(req, res){
      db.getRequests(req, res);
    },
    
    createRequest: function(req, res){
      db.createRequest(req, res);
    },
    
    updateRequest: function(req, res){
      db.updateRequest(req, res);
    },
    
  };

})();

export module storageService;

