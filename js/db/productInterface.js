const Products = require('../models/product');
const Commons = require('./commons');

var ProductInterface = (function(){
  
  function oProductInterface(){};
  
  oProductInterface.prototype = {
    
    getAll: function(){
      return Products.find();
    },
    
    getOne: function(id){
      return Products.find({"uniqueCode": id}).exec();
    },
        
    insert: function(product){
      return Commons.getNextUniqueCode(Products,(nextUniqueCode)=>{
          let newProduct = new Products(product);
          newProduct.uniqueCode = nextUniqueCode;
          return newProduct.save();
      })
    },
    
    update: function(id, product){
      return Products.find({"uniqueCode": id}).
        exec((err,products)=>{
          if(products.length > 0){
            products[0].name = product.name;
            products[0].description = product.description;
            products[0].priceSince = product.priceSince;
            return products[0].save();            
          }
        });
    },
    
    deleteAll: function(){
      return Products.remove();
    },
    
    deleteOne: function(id){
      return Products.find({"uniqueCode": id}).
        exec((err,products)=>{
          if(products.length > 0){
            products[0].remove((err,deletedProduct)=>{
              return deletedProduct;
            });
          }
        });
    }
    
  };

  return oProductInterface;

})();

oProductInterface = new ProductInterface();

module.exports = oProductInterface;

