var mongoose = require('mongoose')
var schemas = require('./schemas')

var Queries = {}
// ** Models **

var Tournaments = mongoose.model('alltournaments', schemas.tournamentSchema)
var Participants = mongoose.model('allparticipants', schemas.participantSchema)

// ** Queries **

Queries.uniqueParticipantNames = function () {
  return Participants.aggregate(
    [
      {
        '$group': {
          '_id': '$name',
          'count': {'$sum': 1}
        }
      },
      {
        '$sort': {
          'count': -1
        }
      }
    ]
  )
}

// You give it the cutoff date (down to the day), it gives you an object with participants since
// that date. TODO: make this work w/ 2 dates as the input to allow for getting participants \
// between dates.

Queries.getParticipantsSince = function (month, year, day = 1) {
  // If we set the month to be the month before the requested one, we'll automatically get it
  // set to cutoff at the last second of that month, that way we don't need to specify day or hour
  // but still get the entire length of the months needed. - Colin
  let realMonth = month === 12 ? 1 : month - 1

  let cutoff = new Date(year, realMonth, day)

  return Participants.aggregate(
    [
      {
        $match: {
          created_at: {$gte: cutoff}
        }
      },
      {
        $group: {
          _id: '$name',
          count: {$sum: 1}
        }
      }
    ]
  )
}

module.exports = Queries
