var mongoose = require('mongoose')
var Schemas = require('./schemas')

mongoose.Promise = global.Promise

let Insert = {}

// REMEMBER: when using these functions, collectionName should be a singluar noun, but mongoose will
// make it plural when turning the model into a collection.

Insert.participants = function (inputData, collectionName) {
  let promiseArray = []
  let model = mongoose.model(collectionName, Schemas.participantSchema)

  // NOTE: does the use of 'this' here work? I'm not sure if it will or not

  inputData.forEach(() => {
    this.forEach(() => {
      promiseArray.push(insertionPromise(this.participant, model))
    })
  })
  return Promise.all(promiseArray)
}

Insert.tournaments = function (inputData, collectionName) {
  let promiseArray = []
  let model = mongoose.model(collectionName, Schemas.tournamentSchema)

  inputData.forEach(doc => {
    promiseArray.push(insertionPromise(doc, model))
  })

  return Promise.all(promiseArray)
}

// NOTE: support for match data has not been added yet and so this is likely buggy

Insert.matches = function (inputData, collectionName) {
  let promiseArray = []
  let model = mongoose.model(collectionName, Schemas.matchSchema)

  inputData.forEach(() => {
    promiseArray.push(insertionPromise(this.match, model))
  })

  return Promise.all(promiseArray)
}

// Helper (non-exported) functions

function insertionPromise (inputData, inputModel) {
  console.log(inputData)
  return inputModel.create(inputData, (err, data) => {
    if (err) return handleError(err)
  })
}

// TODO:0 Real error handling
function handleError (err) {
  console.log('OH GOSH NO')
  throw (err)
}

module.exports = Insert
