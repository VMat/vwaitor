const storageService = require('./storageService');

const requestService = (function(){

  function oRequestService(){}
  
  oRequestService.prototype = {
  
    getRequests: function(){      
      return storageService.getRequests();
    }
  
  }

  return oRequestService;

})();

const oRequestService = new requestService();

module.exports = oRequestService;
