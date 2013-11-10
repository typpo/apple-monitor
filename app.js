var request = require('request')
  , _ = require('underscore')
  , Q = require('q')
  , querystring = require('querystring')

var models_16g = {
  'ME341LL/A': 'iphone 5s space gray verizon 16gb',
  'ME343LL/A': 'iphone 5s gold verizon 16gb',
  'ME342LL/A': 'iphone 5s silver verizon 16gb',
};

var ZIPCODE = 94043;
var PHONE_NUMBER = null;   // '5555555555'

function check(url) {
  var deferred = Q.defer();
  request(url, function(err, resp, body) {
    obj = JSON.parse(body);
    if (!obj.body || !obj.body.success || !obj.body.stores) {
      deferred.reject();
      return;
    }
    deferred.resolve(obj.body.stores);
  });
  return deferred.promise;
}

function checkStore(store, model, desc) {
  if (store.partsAvailability[model].pickupDisplay !== 'unavailable') {
    var msg = 'phone available: ' +  desc + ' @ ' + store.storeDisplayName;
    console.info(msg);
    return true;
  }
  return false;
}

function checkStores(stores, model, desc) {
  var any = _.some(stores, function(store) {
    return checkStore(store, model, desc);
  });

  if (any && PHONE_NUMBER) {
    request.post({
      uri:'http://textbelt.com/text',
      headers:{'content-type': 'application/x-www-form-urlencoded'},
      body: querystring.stringify({
        number: ''+PHONE_NUMBER,
        message: desc + ' is available in your area.',
      }, function(err, resp, body) {
        console.log(arguments);
      })
    });
  }
}

_.each(models_16g, function(desc, model) {
  var modeluri = encodeURIComponent(model);
  var url = 'http://store.apple.com/us/retail/availabilitySearch?parts.0=' + modeluri + '&zip=' + ZIPCODE;
  check(url).then(function(stores) {
    checkStores(stores, model, desc);
  }).fail(function(err) {
    console.log('search failed');
    console.error(err);
  });
});

