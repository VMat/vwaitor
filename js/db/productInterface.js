const Products = require('../models/product');

var ProductInterface = (function(){
  
  function oProductInterface(){};
  
  oProductInterface.prototype = {
    
    getProducts: function(){
      return Products.find();
    },
    
    getProduct: function(id){
      return Products.find({"uniqueCode": id}).exec();
    },
        
    createProduct: function(product){
      
      let maxUniqueCode = 0;
  
      return Products.find({}).
        limit(1).
        sort('-uniqueCode').
        select('uniqueCode').
        exec((err,products)=>{
          products.map(function (product) {
            maxUniqueCode = product.uniqueCode;
          });
        }).then(()=>{
          let newProduct = new Products(product);
          newProduct.uniqueCode = maxUniqueCode + 1;
          return newProduct.save();
        });
    },
    
    updateProduct: function(id, product){

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
    
    deleteProducts: function(){
      return Products.remove();
    },
    
    deleteProduct: function(id){

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

module.export = oProductInterface;

