/**
 * appe-monitor script
 * MIT License
 *
 * @author Ian Webster (ianww.com)
 */

var request = require('request')
  , _ = require('underscore')
  , Q = require('q')

var models = {
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

function appleSearch(model) {
  var modeluri = encodeURIComponent(model);
  var url = 'http://store.apple.com/us/retail/availabilitySearch?parts.0=' + modeluri + '&zip=' + ZIPCODE;
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

function hasAvailability(store, model, desc) {
  return store.partsAvailability[model].pickupDisplay !== 'unavailable';
}

_.each(models, function(desc, model) {
  appleSearch(model).then(function(stores) {
    var avail_stores  = [];
    var any = _.some(stores, function(store) {
      var avail = hasAvailability(store, model, desc);
      if (avail) {
        avail_stores.push(store);
        var msg = 'phone available: ' +  desc + ' @ ' + store.storeDisplayName;
        console.info(msg);
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
          if (err) {
            console.error('Error texting:', err);
          }
        });
    }
  }).fail(function(err) {
    console.log('search failed');
    console.error(err);
  });
});

