var mongoose = require('mongoose')
var Schemas = mongoose.Schemas
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/SmAshevilleV2')

let Operations = {}

Operations.insertParticipants = function (inputData, collectionName) {
  let promiseArray = []
  let model = mongoose.model(collectionName, Schemas.participantSchema)

  inputData.map(tournament => {
    tournament.map(participant => {
      promiseArray.push(insertionPromise(participant.participant, model))
    })
  })
  return Promise.all(promiseArray)
}

Operations.insertTournaments = function (inputData, collectionName) {
  let promiseArray = []
  let model = mongoose.model(collectionName, Schemas.tournamentSchema)

  inputData.map(tournament => {
    promiseArray.push(insertionPromise(tournament.tournament, model))
  })
  return Promise.all(promiseArray)
}

Operations.insertMatches = function (inputData, collectionName) {
  let promiseArray = []

  for (let tournament of inputData) {
    for (let match of tournament) {
      // TODO: writh the match insert lol
      match = match
    }
  }
  return Promise.all(promiseArray)
}

// Helper (non-exported) functions

function insertionPromise (inputData, inputModel) {
  return inputModel.create(inputData, (err, data) => {
    if (err) return handleError(err)
  // What happens when there's a ton of superfluos data in the input?
  })
}

// TODO:0 Real error handling
function handleError (err) {
  console.log('OH GOSH NO')
  throw (err)
}

module.exports = Operations
