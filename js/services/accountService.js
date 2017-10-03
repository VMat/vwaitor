const storageService = require('./storageService');

const accountService = (function(){

  function oAccountService(){}
  
  oAccountService.prototype = {
  
    getAccounts: function(){
      return new Promise((resolve, reject)=>{
        storageService.getAccounts().
          then(accounts=>resolve(accounts)).
          catch(error=>reject(error))        
      })
    },
    
    getAccount: function(id){
      return new Promise((resolve, reject)=>{
        storageService.getAccount(id).
          then(account=>resolve(account)).
          catch(error=>reject(error))        
      })
    },
    
    createAccount: function(account){
      return new Promise((resolve, reject)=>{
        storageService.createAccount(account).
          then(newAccount=>resolve(newAccount)).
          catch(error=>reject(error))        
      })
    },
    
    updateAccount: function(id, account){
      return new Promise((resolve, reject)=>{
        storageService.updateAccount(id, account).
          then(updatedAccount=>resolve(updatedAccount)).
          catch(error=>reject(error))        
      })
    },
    
    patchAccount: function(id, account){
      return new Promise((resolve, reject)=>{
        storageService.patchAccount(id, account).
          then(patchedAccount=>resolve(patchedAccount)).
          catch(error=>reject(error))        
      })
    },
    
    deleteAccounts: function(){
      return new Promise((resolve, reject)=>{
        storageService.deleteAccounts().
          then(deletedAccounts=>resolve(deletedAccounts)).
          catch(error=>reject(error))        
      })
    },
    
    deleteAccount: function(id){
      return new Promise((resolve, reject)=>{
        storageService.deleteAccount(id).
          then(deletedAccount=>resolve(deletedAccount)).
          catch(error=>reject(error))        
      })
    }
  
  };

  return oAccountService;

})();

const oAccountService = new accountService();

module.exports = oAccountService;
