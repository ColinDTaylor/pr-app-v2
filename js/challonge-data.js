var challongeAPI = require('challonge-node')

const challonge = challongeAPI.withAPIKey('hvA3eLb7hzOGS5py3PM3ZaGJAlRHTACaktnlobkQ')
let api = {}

// NOTE: this uses the SmAsheville URL scheme to get only the singles brackets, there's no clean
//       way to differentiate singles and doubles brackets in a universal way for all communities

// Takes in two numbers representing the interval of tournaments to grab, calls tournament.show
// using the url for those tournaments' singles brackets, stores those tournament JSONs in an array
// and then outputs that array.
api.getSinglesBrackets = function (first, last) {
  let outputArray = []

  for (let weekNum = first; weekNum <= last; weekNum++) {
    let tournamentURL = `smasheville${weekNum}`

    outputArray.push(challonge.tournaments.show(tournamentURL))
  }

  return Promise.all(outputArray)
}

module.exports = api
