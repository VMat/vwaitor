const Requests = require('../models/request');

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
    
      let maxUniqueCode = 0;
  
      return Requests.find({}).
        limit(1).
        sort('-uniqueCode').
        select('uniqueCode').
        exec((err,requests)=>{
          requests.map((request)=>{
              maxUniqueCode = request.uniqueCode;
          });
        }).then(()=>{
          let newRequest = new Requests(request);
          newRequest.uniqueCode = maxUniqueCode + 1;
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
