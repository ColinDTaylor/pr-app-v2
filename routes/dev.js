var express = require('express')
var router = express.Router()
var challonge = require('challonge-node')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('dev', { title: 'Express' })
})

router.get('/challongeGet/:start/:end', (req, res, next) => {
  res.send('hello')
})

module.exports = router
