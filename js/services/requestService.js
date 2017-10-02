const storageService = require('./storageService');

const requestService = (function(){

  function oRequestService(){}
  
  oRequestService.prototype = {
  
    getRequests: function(req, res){      
      return storageService.getRequests(req, res);
    },
    
    getRequest: function(req, res){
      return requestService.getRequest(req, res); 
    },   

    createRequest: function(req, res){
      return requestService.createRequest(req, res); 
    },

    updateRequest: function(req, res){
      return requestService.updateRequest(req, res); 
    },
    
    deleteRequests: function(req, res){
      return requestService.deleteRequests(req, res);
    },

    deleteRequest: function(req, res){
      return requestService.deleteRequest(req, res);
    }    
  
  }

  return oRequestService;

})();

const oRequestService = new requestService();

module.exports = oRequestService;
