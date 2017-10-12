const mongoose = require('mongoose');
const productInterface = require('./productInterface');
const accountInterface = require('./accountInterface');
const requestInterface = require('./requestInterface');
const News     = require('../models/novelty');

let db = (function(){

  function oDb(){}
      
  oDb.prototype = {
  
    connect: function(){
    
      mongoose.connect(process.env.MONGOLAB_URI, function (error) {
        if (error) 
          console.error(error);
        else 
          console.log('mongo connected');
      });
    },
    
    getProducts: function(){
      return productInterface.getAll();
    },
    
    getProduct: function(id){
      return productInterface.getOne(id);
    },
        
    createProduct: function(product){
      return productInterface.insert(product);
    },
    
    updateProduct: function(id, product){
      return productInterface.update(id, product);
    },
    
    deleteProducts: function(){
      return productInterface.deleteAll();
    },
    
    deleteProduct: function(id){
      return productInterface.deleteOne(id);
    },
    
    getAccounts: function(){
      return accountInterface.getAll();
    },
        
    getAccount: function(id){
      return accountInterface.getOne(id);
    },
    
    createAccount: function(account){
      return accountInterface.insert(account);
    },
    
    updateAccount: function(id, account){
      return accountInterface.update(id,account);
    },
    
    deleteAccounts: function(){
      return accountInterface.deleteAll();
    },
    
    deleteAccount: function(id){
      return accountInterface.deleteOne(id);
    },   
    
    getRequests: function(){
      return requestInterface.getAll();
    },
    
    getRequest: function(id){
      return requestInterface.getOne(id);
    },
    
    createRequest: function(request){
      return requestInterface.insert(request);
    },
    
    updateRequest: function(id, request){
      return requestInterface.update(id,request);
    },
    
    deleteRequests: function(){
      return requestInterface.deleteAll();
    },
    
    deleteRequest: function(id){
      return requestInterface.deleteOne();
    },
    
    getNews: function(){
      return News.find();
    },
        
    getNovelty: function(id){
      return News.find({"uniqueCode": id});
    },
    
    createNovelty: function(novelty){

      let maxUniqueCode = 0;
  
      return News.find({}).
        //where('name.last').equals('Ghost').
        //where('age').gt(17).lt(66).
        //where('likes').in(['vaporizing', 'talking']).
        limit(1).
        sort('-uniqueCode').
        select('uniqueCode').
        exec((err,news)=>{
          news.map(function (novelty) {
              maxUniqueCode = novelty.uniqueCode;
          });
        }).then(()=>{
          let newNovelty = new News(novelty);
          newNovelty.uniqueCode = maxUniqueCode + 1;
          return newNovelty.save();
        });
    },
    
    patchNovelty: function(id, novelty){
      let newNovelty = new News(novelty);

      return News.find({"uniqueCode": id}).
        exec((err,news)=>{
          if(news.length > 0){
            news[0].img = newNovelty.img;
            news[0].description = newNovelty.description;
            return news[0].save();
          }
        });
    },
    
    updateNovelty: function(id, novelty){
      let newNovelty = new News(novelty);

      return News.find({"uniqueCode": id}).
        exec((err,news)=>{
          if(news.length > 0){
            news[0].img = novelty.img;
            news[0].description = novelty.description;
            return news[0].save();
          }
        });
    },
    
    deleteNews: function(){
      return News.remove();
    },
    
    deleteNovelty: function(id){
      return News.find({"uniqueCode": id}).
        exec((err,news)=>{        
          if(news.length > 0){
            return news[0].remove();
          }
        });
    }
    
  };
  
  return oDb;
})();

let oDb = new db();

module.exports = oDb;
