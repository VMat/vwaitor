const storageService = require('../services/storageService');

const serviceAccount = (function(){

  function oServiceAccount(){}
  
  oServiceAccount.prototype = {
  
    getAccounts: function(){      
      return storageService.getAccounts();
    }
  
  }

  return oServiceAccount;

})();

const oServiceAccount = new serviceAccount();

module.exports = oServiceAccount;
