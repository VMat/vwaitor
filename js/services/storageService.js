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
    
    getAccounts: function(){
      return db.getAccounts();
    },
   
    getAccount: function(id){
      return db.getAccount(id);
    },
    
    createAccount: function(account){
      return db.createAccount(account);
    },
    
    patchAccount: function(id, account){
      return db.patchAccount(id, account);
    },
    
    updateAccount: function(id, account){
      return db.updateAccount(id, account);
    },
    
    deleteAccounts: function(){
      return db.deleteAccounts();
    },
    
    deleteAccount: function(id){
      return db.deleteAccount(id);
    },
    
    getRequests: function(){
      return db.getRequests();
    },
    
    getRequest: function(id){
      return db.getRequest(id);
    },
    
    createRequest: function(request){
      return db.createRequest(request);
    },
    
    updateRequest: function(id, request){
      return db.updateRequest(id, request);
    },
    
    deleteRequests: function(){
      return db.deleteRequests();
    },
    
    deleteRequest: function(id){
      return db.deleteRequest(id);
    },
    
    getNews: function(){
      return db.getNews();
    },
   
    getNovelty: function(id){
      return db.getNovelty(id);
    },
    
    createNovelty: function(novelty){
      return db.createNovelty(novelty);
    },
    
    patchNovelty: function(id, novelty){
      return db.patchNovelty(id, novelty);
    },
    
    updateNovelty: function(id, novelty){
      return db.updateNovelty(id, novelty);
    },
    
    deleteNews: function(){
      return db.deleteNews();
    },
    
    deleteNovelty: function(id){
      return db.deleteNovelty(id);
    }
    
  };
  
  return oStorageService;

})();

var oStorageServiceb = new storageService();

module.exports = oStorageServiceb;
