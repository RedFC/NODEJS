const Mongoose = require('mongoose');
const winston = require('winston');
module.exports = function () {
   
    Mongoose.connect('mongodb://localhost/System',{ useUnifiedTopology: true , useNewUrlParser: true })
    .then(result => winston.info("connected To DB"))
  
}