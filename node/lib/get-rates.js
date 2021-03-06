'use strict';

var _ = require('underscore');
var request = require('superagent');

var rateTable = {};

request
  .get('http://burdahackday.finanzen100.de/v1/crossrate/crossrate_list')
  .end(function(err, res) {
    if (err) throw err;
    var rates;
    try {
      rates = JSON.parse(res.text);
      var eurRates = _.filter(rates.CROSSRATE_LIST, function(rate) {
        return rate.ISO_CURRENCY_TO == 'EUR';
      });
      _.each(eurRates, function(rate) {
        rateTable[rate.ISO_CURRENCY_FROM.toLowerCase()] = rate.PRICE_R;
      });
      console.log('Exchange rates loaded!');
    } catch (err) {
      console.log(err);
    }
  });

module.exports = rateTable;
