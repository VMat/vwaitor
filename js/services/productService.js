const storageService = require('./storageService');

const productService = (function(){

  function oProductService(){}
  
  oProductService.prototype = {
  
    getProducts: function(){      
      return storageService.getProducts();
    },
    
    getProduct: function(req, res){
      return storageService.getProduct(req, res);
    },
    
    createProduct: function(req, res){
      return storageService.createProduct(req, res);
    },
    
    updateProduct: function(req, res){
      return storageService.updateProduct(req, res);
    },
    
    deleteProducts: function(req, res){
      return storageService.deleteProducts(req, res);
    },
    
    deleteProduct: function(req, res){
      return storageService.deleteProduct(req, res);
    }
      
  }

  return oProductService;

})();

const oProductService = new productService();

module.exports = oProductService;
