
const storageService = require('../services/storageService');

const Request = (function(){

  function oRequest(){}
  
  oRequest.prototype = {
  
    getRequests: function(){      
      return storageService.getRequests();
    }
  
  }

  return oRequest;

})();

module.exports = Request;
