const storageService = require('./storageService');

const productService = (function(){

  function oProductService(){}
  
  oProductService.prototype = {
  
    getProducts: function(){      
      return storageService.getProducts();
    }
  
  }

  return oProductService;

})();

const oProductService = new productService();

module.exports = oProductService;
