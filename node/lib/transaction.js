'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionSchema = new Schema({
  id:       Schema.ObjectId,
  activity: String,
  user:     String,
  name:     String,
  amount:   Number,
  fee:      Number,
  currency: String
});

module.exports = mongoose.model('Transaction', transactionSchema);
