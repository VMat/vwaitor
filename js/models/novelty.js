var mongoose = require('mongoose');

noveltySchema = new mongoose.Schema({ 
  uniqueCode: Number,
  img: String,
  description: String
});

Novelty = mongoose.model('admin2', noveltySchema, 'News');

module.exports = Novelty;
