let Commons = (function(){

  function oCommons(){};
  
  oCommons.prototype = {
    
    getNextUniqueCode: function(Collection,fn){
      
      let nextUniqueCode = null;
      
      Collection.find({}).
        limit(1).
        sort('-uniqueCode').
        select('uniqueCode').
        exec((err,doc)=>{
          if(doc.length>0){
            nextUniqueCode = doc[0].uniqueCode + 1;
          }
          else{
            nextUniqueCode = 1;
          }
        }).then(()=>{fn(nextUniqueCode)});
    }
  
  };
  
  return oCommons;

})();

const oCommons = new Commons();

module.exports = oCommons;
