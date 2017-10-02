const storageService = require('../services/storageService');

const Product = (function(){

  function oProduct(){}
  
  oProduct.prototype = {
  
    getProducts: function(){      
      return storageService.getProducts();
    }
  
  }

  return oProduct;

})();

module.exports Product;
