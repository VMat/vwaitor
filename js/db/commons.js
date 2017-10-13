let Commons = (function(){

  function oCommons(){};
  
  oCommons.prototype = {
    
    getNextUniqueCode: function(Collection,fn){
      Collection.find({}).
        limit(1).
        sort('-uniqueCode').
        select('uniqueCode').
        exec((err,doc)=>{
          if(doc.length>0){
            fn(doc[0].uniqueCode + 1)
          }
          else{
            fn(1);
          }
        });
    }
  
  };
  
  return oCommons;

})();

const oCommons = new Commons();

module.exports = oCommons;
