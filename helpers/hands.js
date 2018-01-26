/*

  transform request data to proper format:

  example:
  req.body = {
    'h2c1-rank': '3',
    'h2c1-suit': 'hearts',
    'h2c2-rank': '13',
    'h2c2-suit': 'spades',
    ...etc
  }

  poker.js example data:

  hand1 = [
    { suit: 'spades', rank: 10 },
    { suit: 'spades', rank: 13 },
    { suit: 'hearts', rank: 8 },
    { suit: 'clubs', rank: 10 },
    { suit: 'clubs', rank: 8 }
  ]

  hand2 = ...etc

*/

exports.getRequestData = function(reqBody) {
  const response = [];

  const hand1 = [];
  const hand2 = [];
  const values = Object.values(reqBody);

  for (let i = 0; i < values.length - 1; i+=2) {
    if (i < 10) {
      hand1.push({
        suit: values[i+1],
        rank: values[i]
      });
    } else {
      hand2.push({
        suit: values[i+1],
        rank: values[i]
      })
    }
  }
  response.push(hand1, hand2)

  return response;
}

module.exports = exports;
