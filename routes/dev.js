var express = require('express')
var router = express.Router()
// var challongeAPI = require('challonge-node')
var insert = require('../js/insert-data.js')
var challongeData = require('../js/challonge-data')

// const challonge = challongeAPI.withAPIKey('hvA3eLb7hzOGS5py3PM3ZaGJAlRHTACaktnlobkQ')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('dev', { title: 'Express' })
})

router.get('/tournamentsGet/:collectionName/:idStart/:idEnd', (req, res, next) => {
  if (Number(req.params.idStart) > Number(req.params.idEnd)) {
    res.send('Make sure the second URL parameter is larger than the first.')
  } else {
    challongeData.getSinglesBrackets(req.params.idStart, req.params.idEnd)
      .then(data => {
        return insert.tournaments(data, req.params.collectionName)
      })
      .then(output => {
        res.send(output)
      })
  }
})

router.get('/participantsGet/:collectionName/:idStart/:idEnd', (req, res, next) => {
  if (Number(req.params.idStart) > Number(req.params.idEnd)) {
    res.send('Make sure the second URL parameter is larger than the first.')
  } else {
    challongeData.getParticipants(req.params.idStart, req.params.idEnd)
      .then(data => {
        return insert.participants(data, req.params.collectionName)
      })
      .then(output => {
        res.send(output)
      })
  }
})

module.exports = router
