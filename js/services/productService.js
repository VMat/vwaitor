const storageService = require('./storageService');

const productService = (function(){

  function oProductService(){}
  
  oProductService.prototype = {
  
    getProducts: function(){      
      return new Promise((resolve, reject)=>{
        storageService.getProducts().
          then(products=>resolve(products)).
          catch(error=>reject(error))        
      })
    },
    
    getProduct: function(id){
      return new Promise((resolve, reject)=>{
        storageService.getProduct(id).
          then(products=>resolve(products)).
          catch(error=>reject(error))        
      })                
    },
    
    createProduct: function(product){
      return new Promise((resolve, reject)=>{
        storageService.createProduct(product).
          then(newProduct=>resolve(newProduct)).
          catch(error=>reject(error)) 
      })
    },
    
    updateProduct: function(id,product){
      return new Promise((resolve, reject)=>{
        storageService.updateProduct(id,product).
          then(updatedProduct=>resolve(updatedProduct)).
          catch(error=>reject(error))  
      })
    },
    
    deleteProducts: function(){
      return new Promise((resolve, reject)=>{
        storageService.deleteProducts().
          then(deletedProducts=>resolve(deletedProducts)).
          catch(error=>reject(error))  
      })
    },
    
    deleteProduct: function(id){
      return new Promise((resolve, reject)=>{
      storageService.deleteProduct(id).
        then(deletedProduct=>resolve(deletedProduct)).
        catch(error=>reject(error))  
      })
    }
  };

  return oProductService;

})();

const oProductService = new productService();

module.exports = oProductService;
