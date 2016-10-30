let Aliases = {}

Aliases.processAlias = function (alias) {
  return alias
    // remove sponsor tags using pipes,
    // along with all characters within parenthesis or brackets at the end of the string.
    .substring(alias.search(/\|/g) + 1)
    // remove all whitespace characters, disabled for now
    // .replace(/\s/g, '')
    // remove certain special characters
    .replace(/['"`_,\\\/\|~*&#@^]/g, '')
    // change all characters to lowercase
    .toLowerCase()
}

module.exports = Aliases
