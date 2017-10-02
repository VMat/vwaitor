const storageService = require('../services/storageService');

const accountService = (function(){

  function oAccountService(){}
  
  oAccountService.prototype = {
  
    getAccounts: function(){      
      return storageService.getAccounts();
    }
  
  }

  return oAccountService;

})();

const oAccountService = new accountService();

module.exports = oAccountService;
