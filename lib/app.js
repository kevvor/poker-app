module.exports = {
	formatHands: function (resObj) {
    const values = Object.values(resObj)
    const h1 = []
    const h2 = []
    const hands = {}
    let counter = 0

    for (let i = 0; i < values.length; i += 2) {
      let card = {
        rank: values[i], //grab the 'pairs' from the array and make them cards
        suit: values[i + 1]
      }
      counter++
			if (counter <= 5) { //after 5 iterations i.e. 'cards' push cards to 2nd hand
				h1.push(card)
			}
			else {
				h2.push(card)
			}
		}
		hands.one = h1;
		hands.two = h2;

	return hands
	}
}
