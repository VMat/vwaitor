var db = require('./db/mongo');

var storageService = (function(){

  function oStorageService(){};
  
  oStorageService.prototype = {
    
    connect: function(){
      db.connect();
    }
    
  };

})();

