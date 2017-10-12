const Accounts = require('../models/account');

let AccountInterface = (function(){

  function oAccountInterface(){};
  
  oAccountInterface.prototype = {
    
    getAll: function(){
      return Accounts.find();
    },
        
    getOne: function(id){
      return Accounts.find({"uniqueCode": id});
    },
    
    insert: function(account){

      let maxUniqueCode = 0;
  
      return Accounts.find({}).
        //where('name.last').equals('Ghost').
        //where('age').gt(17).lt(66).
        //where('likes').in(['vaporizing', 'talking']).
        limit(1).
        sort('-uniqueCode').
        select('uniqueCode').
        exec((err,accounts)=>{
          accounts.map(function (account) {
              maxUniqueCode = account.uniqueCode;
          });
        }).then(()=>{
          let newAccount = new Accounts(account);
          newAccount.uniqueCode = maxUniqueCode + 1;
          return newAccount.save();
        });
    },
    
    patch: function(id, account){
      let newRequest = new Accounts(account);

      return Accounts.find({"uniqueCode": id}).
        exec((err,accounts)=>{
          if(accounts.length > 0){
            if(!Boolean(accounts[0].requests)){
              accounts[0].requests = [];
              accounts[0].total = 0;
            }
            accounts[0].requests.concat(account.requests);
            accounts[0].total += account.total;
            return accounts[0].save();
          }
        });
    },
    
    update: function(id, account){
      let newRequest = new Accounts(account);

      return Accounts.find({"uniqueCode": id}).
        exec((err,accounts)=>{
          if(accounts.length > 0){
            if(!Boolean(accounts[0].products)){
              accounts[0].products = [];
            }
            accounts[0].tableUniqueCodes = account.tableUniqueCodes;
            accounts[0].products = account.products;
            accounts[0].total = account.total;
            accounts[0].open = account.open;
            accounts[0].paymentMethod = account.paymentMethod;
            return accounts[0].save();
          }
        });
    },
    
    deleteAll: function(){
      return Accounts.remove();
    },
    
    deleteOne: function(id){
      return Accounts.find({"uniqueCode": id}).
        exec((err,accounts)=>{        
          if(accounts.length > 0){
            return accounts[0].remove();
          }
        });
    },   
  };
  
  return oAccountInterface;

})();

let oAccountInterface = new AccountInterface();

module.exports = oAccountInterface;
