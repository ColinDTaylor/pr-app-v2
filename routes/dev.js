var express = require('express')
var router = express.Router()
var challongeAPI = require('challonge-node')

const challonge = challongeAPI.withAPIKey('hvA3eLb7hzOGS5py3PM3ZaGJAlRHTACaktnlobkQ')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('dev', { title: 'Express' })
})

router.get('/challongeGet/:tournamentId', (req, res, next) => {
  challonge.tournaments.show(req.params.tournamentId).then(tournament => {
    res.send(tournament)
  })
})

module.exports = router
