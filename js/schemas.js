var mongoose = require('mongoose')
var Schema = mongoose.Schema
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
  tournament_id: Number,
  created_at: Date,
  updated_at: Date,
  final_rank: Number
})

Schemas.tournamentSchema = new Schema({
  id: Number,
  name: String,
  url: String,
  description: String,
  started_at: Date,
  completed_at: Date,
  created_at: Date,
  updated_at: Date,
  game_id: Number,
  participants_count: Number,
  state: String,
  full_challonge_url: String,
  live_image_url: String,
  game_name: String
})

Schemas.matchSchema = new Schema({
  // TODO: make the match schema lol
})

module.exports = Schemas
