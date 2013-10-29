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

function check(url) {
  var deferred = Q.defer();
  request(url, function(err, resp, body) {
    obj = JSON.parse(body);
    if (!obj.body || !obj.body.success || !obj.body.stores) {
      deferred.reject();
    }
    deferred.resolve(obj.body.stores);
  })
  return deferred.promise;
}

function checkstore(store, model, desc) {
  if (store.partsAvailability[model].pickupDisplay !== 'unavailable') {
    var msg = 'phone available: ' +  desc + ' @ ' + store.storeDisplayName;
    console.info(msg);
    /*
    request.post({
      uri:'http://textbelt.com/text',
      headers:{'content-type': 'application/x-www-form-urlencoded'},
      body: querystring.stringify({
        number: '1234567890',
        message: msg
      }, function(err, resp, body) {
        console.log(arguments);
      })
    });
    */
  }
}

_.each(models_16g, function(desc, model) {
  var modeluri = encodeURIComponent(model);
  check('http://store.apple.com/us/retail/availabilitySearch?parts.0=' + modeluri + '&zip=' + ZIPCODE).then(function(stores) {
    stores.map(function(store) {
      return checkstore(store, model, desc);
    });
  }).fail(function(err) {
    console.log('search failed');
  });
});
