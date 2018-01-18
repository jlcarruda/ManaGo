const config = require('./config.json')
const Request = require('request-promise')
const Qs = require('qs')
// const DatabaseManager = require('./database')
const Errors = require('common-errors')
const delay = require('delay')

// SCRYFALL Interface
const getAPI = (uri, query) => {
  let requestObj = {
    baseUrl: config.scryfall.url,
    uri: uri,
    json: true
  };

  if(query) {
    requestObj.qs = query;
  }

  return Request.get(requestObj)
}

exports.getRandomCards = (cb) => {
  
  return getAPI('/cards/random')
    .then( (data) => {
      cb(null, data);
    })
    .catch( (err) => {
      cb(err)
    })
  
}

exports.getCardByName = (name, cb) => {
  let query = {
      fuzzy: name
  }

  getAPI('/cards/named', query)
    .then( (data) => {
      cb(null, data);
    })
  .catch((err) => cb(err))
} 