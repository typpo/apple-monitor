/**
 * appe-monitor script
 * MIT License
 *
 * @author Ian Webster (ianww.com)
 */

var request = require('request')
  , _ = require('underscore')
  , Q = require('q')

var models_16g = {
  'ME341LL/A': 'iphone 5s space gray verizon 16gb',
  'ME343LL/A': 'iphone 5s gold verizon 16gb',
  'ME342LL/A': 'iphone 5s silver verizon 16gb',
  // Add products you're interested in.
};

if (process.argv.length < 3) {
  console.log('usage: node apple.js zipcode');
  process.exit(1);
}

var ZIPCODE = process.argv[2];
var PHONE_NUMBER = null;
if (process.argv.length > 3) {
  PHONE_NUMBER = process.argv[3];
}

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
  var avail_stores  = [];
  var any = _.some(stores, function(store) {
    var avail = checkStore(store, model, desc);
    if (avail) {
      avail_stores.push(store);
    }
    return avail;
  });

  if (any && PHONE_NUMBER) {
    request.post('http://textbelt.com/text',
      { form: {
          number: ''+PHONE_NUMBER,
          message: desc + ' is available at ' + avail_stores[0].storeName,
        }
      }, function(err, resp, body) {
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
