const storageService = require('./storageService');

const noveltyService = (function(){

  function oNoveltyService(){}
  
  oNoveltyService.prototype = {
  
    getNews: function(){
      return new Promise((resolve, reject)=>{
        storageService.getNews().
          then(news=>resolve(news)).
          catch(error=>reject(error))        
      })
    },
    
    getNovelty: function(id){
      return new Promise((resolve, reject)=>{
        storageService.getNovelty(id).
          then(novelty=>resolve(novelty)).
          catch(error=>reject(error))        
      })
    },
    
    createNovelty: function(novelty){
      return new Promise((resolve, reject)=>{
        storageService.createNovelty(novelty).
          then(newNovelty=>resolve(newNovelty)).
          catch(error=>reject(error))        
      })
    },
    
    updateNovelty: function(id, novelty){
      return new Promise((resolve, reject)=>{
        storageService.updateNovelty(id, novelty).
          then(updatedNovelty=>resolve(updatedNovelty)).
          catch(error=>reject(error))        
      })
    },
    
    patchNovelty: function(id, novelty){
      return new Promise((resolve, reject)=>{
        storageService.patchNovelty(id, novelty).
          then(patchedNovelty=>resolve(patchedNovelty)).
          catch(error=>reject(error))        
      })
    },
    
    deleteNews: function(){
      return new Promise((resolve, reject)=>{
        storageService.deleteNews().
          then(deletedNews=>resolve(deletedNews)).
          catch(error=>reject(error))        
      })
    },
    
    deleteNovelty: function(id){
      return new Promise((resolve, reject)=>{
        storageService.deleteNovelty(id).
          then(deletedNovelty=>resolve(deletedNovelty)).
          catch(error=>reject(error))        
      })
    }
  
  };

  return oNoveltyService;

})();

const oNoveltyService = new noveltyService();

module.exports = oNoveltyService;
