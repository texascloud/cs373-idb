import 'whatwg-fetch';


export function get(url) {
  fetch(url)
    .then(function(response) {
      console.log('Fetch: response '+response);
      //console.log('Fetch: json '+response.json());
      return response.json();
    }).then(function(json) {
    console.log('parsed json', json)
  }).catch(function(e) {
    console.log('parsing failed', e)
  });
}

export function getStuff(url) {
  getJSON({
    url: url,
    cacheBusting: true
  }).then(function (data) {// on success
    console.log('in getJSON');
    console.log(data);
    return data;
  }, function (error) {// on reject
    console.error('An error occured!');
    console.error(error.message ? error.message : error);
  });
}

var processStatus = function (response) {
  if (response.status === 200 || response.status === 0) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
};

var MAX_WAITING_TIME = 5000;// in ms

var parseJson = function (response) {
  return response.json();
};

/* @returns {wrapped Promise} with .resolve/.reject/.catch methods */
// It goes against Promise concept to not have external access to .resolve/.reject methods, but provides more flexibility
var getWrappedPromise = function () {
  var wrappedPromise = {},
    promise = new Promise(function (resolve, reject) {
      wrappedPromise.resolve = resolve;
      wrappedPromise.reject = reject;
    });
  wrappedPromise.then = promise.then.bind(promise);
  wrappedPromise.catch = promise.catch.bind(promise);
  wrappedPromise.promise = promise;// e.g. if you want to provide somewhere only promise, without .resolve/.reject/.catch methods
  return wrappedPromise;
};

/* @returns {wrapped Promise} with .resolve/.reject/.catch methods */
var getWrappedFetch = function () {
  var wrappedPromise = getWrappedPromise();
  var args = Array.prototype.slice.call(arguments);// arguments to Array

  fetch.apply(null, args)// calling original fetch() method
    .then(function (response) {
      wrappedPromise.resolve(response);
    }, function (error) {
      wrappedPromise.reject(error);
    })
    .catch(function (error) {
      wrappedPromise.catch(error);
    });
  return wrappedPromise;
};

/**
 * Fetch JSON by url
 * @param { {
 *  url: {String},
 *  [cacheBusting]: {Boolean}
 * } } params
 * @returns {Promise}
 */
var getJSON = function(params) {
  var wrappedFetch = getWrappedFetch(
    params.url,
    {
      method: 'get',// optional, "GET" is default value
      headers: {
        'Accept': 'application/json'
      }
    });

  var timeoutId = setTimeout(function () {
    wrappedFetch.reject(new Error('Load timeout for resource: ' + params.url));// reject on timeout
  }, MAX_WAITING_TIME);

  return wrappedFetch.promise// getting clear promise from wrapped
    .then(function (response) {
      clearTimeout(timeoutId);
      return response;
    })
    .then(processStatus)
    .then(parseJson);
};
