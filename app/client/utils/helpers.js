export function arrWithoutTerm(obj, term) {
  var results = [];
  for (var key in obj[0]) {
    results.push(key);
  }
  results.splice(results.indexOf(term), 1);
  return results;
}