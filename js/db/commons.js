let Commons = (function(){

  function oCommons(){};
  
  oCommons.prototype = {
    
    getNextUniqueCode: function(Collection){
      return Collection.find({}).
        limit(1).
        sort('-uniqueCode').
        select('uniqueCode').
        exec((err,doc)=>{
          if(doc.length>0){
            return doc[0].uniqueCode + 1
          }
          else{
            return 1;
          }
        });
    }
  
  };
  
  return oCommons;

})();

const oCommons = new Commons();

module.exports = oCommons;
