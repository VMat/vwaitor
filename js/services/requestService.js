const storageService = require('./storageService');

const requestService = (function(){

  function oRequestService(){}
  
  oRequestService.prototype = {
  
    getRequests: function(){
      return new Promise((resolve, reject)=>{
        storageService.getRequests().
          then(requests=>resolve(requests)).
          catch(error=>reject(error))        
      })
    },
    
    getRequest: function(id){
      return new Promise((resolve, reject)=>{
        requestService.getRequest(id).
          then(request=>resolve(request)).
          catch(error=>reject(error))        
      })
    },   

    createRequest: function(request){
      return new Promise((resolve, reject)=>{
        requestService.createRequest(request).
          then(newRequest=>resolve(newRequest)).
          catch(error=>reject(error))        
      })
    },

    updateRequest: function(id, request){
      return new Promise((resolve, reject)=>{
        requestService.updateRequest(id, request).
          then(updatedRequest=>resolve(updatedRequest)).
          catch(error=>reject(error))        
      })
    },
    
    deleteRequests: function(){
      return new Promise((resolve, reject)=>{
        requestService.deleteRequests().
          then(deletedRequests=>resolve(deletedRequests)).
          catch(error=>reject(error))        
      })
    },

    deleteRequest: function(id){
      return new Promise((resolve, reject)=>{
        requestService.deleteRequest(id).
          then(deletedRequest=>resolve(deletedRequest)).
          catch(error=>reject(error))        
      })
    }    
  
  }

  return oRequestService;

})();

const oRequestService = new requestService();

module.exports = oRequestService;
