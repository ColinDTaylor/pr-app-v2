var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  res.locals.title     = "Express"
  res.locals.developer = Math.random() < 0.5 ? "Colin" : "Joseph"
  res.render('index', res.locals)
})

module.exports = router
