var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activitySchema = new Schema({
  id:       Schema.ObjectId,
  name:     String,
  master:   String,
  users:    [String]
});

module.exports = mongoose.model('Activity', activitySchema);
