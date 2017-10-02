const storageService = require('./storageService');

const accountService = (function(){

  function oAccountService(){}
  
  oAccountService.prototype = {
  
    getAccounts: function(req, res){      
      return storageService.getAccounts(req, res);
    },
    
    getAccount: function(req, res){
      return storageService.getAccount(req, res);
    },
    
    createAccount: function(req, res){
      return storageService.createAccount(req, res);
    },
    
    updateAccount: function(req, res){
      return storageService.updateAccount(req, res);
    },
    
    patchAccount: function(req, res){
      return storageService.patchAccount(req, res);
    },
    
    deleteAccounts: function(req, res){
      return storageService.deleteAccounts(req, res);
    },
    
    deleteAccount: function(req, res){
      return storageService.deleteAccount(req, res);
    }
  
  };

  return oAccountService;

})();

const oAccountService = new accountService();

module.exports = oAccountService;
