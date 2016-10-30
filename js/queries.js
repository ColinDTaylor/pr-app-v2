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

module.exports = Queries
