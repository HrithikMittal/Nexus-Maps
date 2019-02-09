var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MapSchema = new Schema({
  bname: String,
  pno: String,
  latitude:String,
  longitude:String,

});

module.exports = mongoose.model('Maps',MapSchema);
