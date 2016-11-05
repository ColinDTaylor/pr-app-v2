var express = require('express')
var router = express.Router()
var insert = require('../js/insert-data')
var challongeData = require('../js/challonge-data')
var queries = require('../js/queries')
var aliasHandler = require('../js/alias-handler')

// This is a route used to perform certain developer functions such as populating a local db,
// for now all of them are activated by just going to that page because I'm FAR too lazy to code
// a proper front end for them.

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

router.get('/uniqueParticipants', (req, res, next) => {
  queries.uniqueParticipantNames().then(docs => {
    for (let player of docs) {
      player.tag = aliasHandler.processAlias(player._id)
      console.log(player._id)
    }
    res.locals.tagList = docs
    res.render('players-list', res.locals)
  })
})

router.get('/getParticipantsSince/:month/:year', (req, res, next) => {
  queries.getParticipantsSince(req.params.month, req.params.year).then(docs => {
    res.locals.tagList = docs.sort((a, b) => {
      return Number(b.count) - Number(a.count)
    })

    res.render('players-list', res.locals)
  })
})

module.exports = router
