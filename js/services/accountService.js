const storageService = require('./storageService');

const accountService = (function(){

  function oAccountService(){}
  
  oAccountService.prototype = {
  
    getAccounts: function(){      
      return storageService.getAccounts();
    },
    
    getAccount: function(id){
      return storageService.getAccount(id);
    },
    
    createAccount: function(account){
      return storageService.createAccount(account);
    },
    
    updateAccount: function(id, account){
      return storageService.updateAccount(id, account);
    },
    
    patchAccount: function(id, account){
      return storageService.patchAccount(id, account);
    },
    
    deleteAccounts: function(){
      return storageService.deleteAccounts();
    },
    
    deleteAccount: function(id){
      return storageService.deleteAccount(id);
    }
  
  };

  return oAccountService;

})();

const oAccountService = new accountService();

module.exports = oAccountService;
