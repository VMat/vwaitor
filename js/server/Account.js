const storageService = require('../services/storageService');

const Account = (function(){

  function oAccount(){}
  
  oAccount.prototype = {
  
    getAccounts: function(){      
      return storageService.getAccounts();
    }
  
  }

  return oAccount;

})();

module.exports = Account;
