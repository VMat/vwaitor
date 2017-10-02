const storageService = require('./storageService');

const productService = (function(){

  function oProductService(){}
  
  oProductService.prototype = {
  
    getProducts: function(){      
      return storageService.getProducts(req, res);
    },
    
    getProduct: function(){
      return storageService.getProduct(req, res);
    },
    
    createProduct: function(){
      return storageService.createProduct(req, res);
    },
    
    updateProduct: function(){
      return storageService.updateProduct(req, res);
    },
    
    deleteProducts: function(){
      return storageService.deleteProducts(req, res);
    },
    
    deleteProduct: function(){
      return storageService.deleteProduct(req, res);
    }
      
  }

  return oProductService;

})();

const oProductService = new productService();

module.exports = oProductService;
