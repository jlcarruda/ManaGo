// import ManaVai from './src/manavai';
// import * as express from 'express';

let ManaVai = require('./src/manavai')
let express = require('express');

let app = express();
app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
})

app.get('/card', (req, res) => {
  if(req.query.name){
    ManaVai.Scryfall.getCardByName(req.query.name, (err, card) => {
      if(err){
        console.log('Error', err)
        return res.send({ err: true, errdata: err})
      }
      console.log(card); 
      res.status(200).send(card)
    })
  } else {
    res.status(200).send()
  }
})

app.get('/random', (req, res) => {

  ManaVai.Scryfall.getRandomCards((err, data) => {
    if(err){
      return res.status(500).send(err)
    }
    res.status(200).send(data)
  })
})

app.listen(3000,(err) => {
  console.log('Up and Running!')
});