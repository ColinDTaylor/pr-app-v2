var mongoose = require('mongoose')
var Schema = mongoose.Schemas
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/SmAshevilleV2')

let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('we did it')
})

let Schemas = {}

// Challonge data schemas

Schemas.participantSchema = new Schema({
  id: Number,
  name: String,
  seed: Number,
  tournamentId: Number,
  createdAt: Date,
  updatedAt: Date,
  finalRank: Number
})

Schemas.tournamentSchema = new Schema({
  id: Number,
  name: String,
  url: String,
  description: String,
  startedAt: Date,
  completedAt: Date,
  createdAt: Date,
  updatedAt: Date,
  gameId: Number,
  participantsCount: Number,
  state: String,
  fullChallongeUrl: String,
  liveImageUrl: String,
  gameName: String,
  progressMeter: Number
})

Schemas.matchSchema = new Schema({
  // TODO: make the match schema lol
})

module.exports = Schemas
