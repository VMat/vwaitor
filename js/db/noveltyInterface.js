const News = require('../models/novelty');

let NoveltyInterface = (function(){

  function oNoveltyInterface(){};
  
  oNoveltyInterface.prototype = {
  
    getAll: function(){
      return News.find();
    },
        
    getOne: function(id){
      return News.find({"uniqueCode": id});
    },
    
    insert: function(novelty){

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
    
    patch: function(id, novelty){
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
    
    update: function(id, novelty){
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
    
    deleteAll: function(){
      return News.remove();
    },
    
    deleteOne: function(id){
      return News.find({"uniqueCode": id}).
        exec((err,news)=>{        
          if(news.length > 0){
            return news[0].remove();
          }
        });
    }
  
  };
  
  return oNoveltyInterface;

})();

let oNoveltyInterface = new NoveltyInterface();
module.exports = oNoveltyInterface;
