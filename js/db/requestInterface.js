const Requests = require('../models/request');
const Accounts = require('../models/account');
const Commons  = require('./commons');

let RequestInterface = (function(){

  function oRequestInterface(){};
  
  oRequestInterface.prototype = {
  
    getAll: function(){
      return Requests.find();
    },
    
    getOne: function(id){
      return Requests.find({"uniqueCode": id});
    },
    
    insert: function(request){
      return Commons.getNextUniqueCode(Requests,(nextUniqueCode)=>{
        let newRequest = new Requests(request);
        newRequest.uniqueCode = nextUniqueCode;
        newRequest.save((err)=>{
          Accounts.find((err, accounts)=>{
            let newAccount = null;
            if(accounts.length>0){
              newAccount = accounts[0].requests.push(newRequest);
            }
            else{
              newAccount = new Accounts({uniqueCode: 1, requests: [newRequest]});
            }
            return newAccount.save();
          })
        });
      }); 
    },
    
    update: function(id, request){

      return Requests.find({"uniqueCode": id}).
        exec((err,requests)=>{
          if(requests.length > 0){
            requests[0] = request;
            return requests[0].save();
          }
        });
    },
    
    deleteAll: function(){
      return Requests.remove();
    },
    
    deleteOne: function(id){
      return Requests.find({"uniqueCode": id}).
        exec((err,requests)=>{
          if(requests.length > 0){
            return requests[0].remove();
          }
      });
    },
  
  };

  return oRequestInterface;

})();

let oRequestInterface = new RequestInterface();
module.exports = oRequestInterface;
