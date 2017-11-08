const handValues = {
  royalFlush: 23,
  straightFlush: 22,
  fourKind: 21,
  fullHouse: 20,
  flush: 19,
  straight: 18,
  threeKind: 17,
  twoPair: 16,
  pair: 15,
  card: 14,
}

function getRandomSuit() {
  const suit = ['hearts', 'spades', 'diamonds', 'clubs']
  return suit[Math.floor(Math.random() * suit.length)]
}

function getRandomRank() {
  const rank = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  return rank[Math.floor(Math.random() * rank.length)]
}

function byRank(a, b) {
  let comparison = 0

  if (a.rank > b.rank) {
    comparison = 1
  }
  else if (a.rank < b.rank) {
    comparison = -1
  }
  return comparison
}

function getHighCard(fiveCardHand) {
  let highCard = 0
  for (let card in fiveCardHand) {
    if (fiveCardHand[card].rank > highCard) {
      highCard = fiveCardHand[card].rank
    }
  }
  return highCard
}

function checkRoyalFlush(fiveCardHand) {
  let totalRank = 0

  if(!checkIfFlush(fiveCardHand)) {
    return false
  }

  for (let card in fiveCardHand) {
    totalRank += fiveCardHand[card].rank
  }

  if (totalRank !== 55) {
    return false
  }
  return true
}

function checkIfFlush(fiveCardHand) {
  let counter = {hearts: 0, spades: 0, diamonds: 0, clubs: 0}
  let isFlush = false

  for (let card in fiveCardHand) {
    counter[fiveCardHand[card].suit] += 1
  }

  for (let suit in counter) {
    if (counter[suit] === 5) {
      isFlush = true
      return isFlush
    }
  }
  return isFlush
}

function checkSequence(indexA, indexB) {
  if (indexA !== indexB - 1) {
    return false
  }
  return true
}

function checkIfStraight(fiveCardHand) {
  fiveCardHand.sort(byRank)

  for (let i = 0; i < fiveCardHand.length; i++) {
    if (!fiveCardHand[i+1]) {
      break
    }
    if (!checkSequence(fiveCardHand[i].rank, fiveCardHand[i+1].rank)) {
      return false
    }
  }
  return true
}

function checkStraightFlush(fiveCardHand) {
  if (!checkIfFlush(fiveCardHand)) {
    return false
  }
  if (!checkIfStraight(fiveCardHand)) {
    return false
  }
  return true
}

function checkIfFourKind(fiveCardHand) {
  let rank = 0
  fiveCardHand.sort(byRank)

  if (fiveCardHand[0].rank === fiveCardHand[1].rank &&
      fiveCardHand[0].rank === fiveCardHand[2].rank &&
      fiveCardHand[0].rank === fiveCardHand[3].rank) {
    rank = fiveCardHand[0].rank
    return rank
  }
  return false
}

function checkIfThreeKind(fiveCardHand) {
  let rank = 0
  fiveCardHand.sort(byRank)

  if (fiveCardHand[0].rank === fiveCardHand[1].rank &&
      fiveCardHand[0].rank === fiveCardHand[2].rank) {
        rank = fiveCardHand[0].rank
        return rank
      }
  return false
}

function checkMultiples(fiveCardHand) {
  let check = {}
  let multiples = {}

  fiveCardHand.sort(byRank)

  for (let i = 0; i < fiveCardHand.length; i++) {
    if (!check[fiveCardHand[i].rank]) {
      check[fiveCardHand[i].rank] = 1
    }
    else {
      check[fiveCardHand[i].rank] += 1
    }
  }

  for (let rank in check) {
    if (check[rank] === 2) {
      multiples[rank] = 2
    }
    else if (check[rank] === 3) {
      multiples[rank] = 3
    }
  }
  return multiples
}

function checkIfFullHouse(fiveCardHand) {
  const multiples = Object.values(checkMultiples(fiveCardHand))
  if (multiples.includes(3) && multiples.includes(2)) {
    return true
  }
  else {
    return false
  }
}

function checkIfTwoPair(fiveCardHand) {
  const multiples = Object.values(checkMultiples(fiveCardHand))
  let pairs = 0

  for (let i = 0; i < multiples.length; i++) {
    if (multiples[i] === 2) {
      pairs += 1
    }
  }
  if (pairs === 2) {
    return true
  }
  else {
    return false
  }
}

function checkIfPair(fiveCardHand) {
  const multiples = Object.values(checkMultiples(fiveCardHand))

  for (let i = 0; i < multiples.length; i++) {
    if (multiples[i] === 2) {
      return true
    }
  }
  return false
}

function determineHandValue(cards) {
  if (checkRoyalFlush(cards)) {
    console.log('hand: royal flush')
    return handValues.royalFlush
  }
  else if (checkStraightFlush(cards)) {
    console.log('hand: straight flush')
    return handValues.straightFlush
  }
  else if (checkIfFourKind(cards)) {
    console.log('hand: four of a kind')
    return handValues.fourKind
  }
  else if (checkIfFullHouse(cards)) {
    console.log('hand: full house')
    return handValues.fullHouse
  }
  else if (checkIfFlush(cards)) {
    console.log('hand: flush')
    return handValues.flush
  }
  else if (checkIfStraight(cards)) {
    console.log('hand: straight')
    return handValues.straight
  }
  else if (checkIfThreeKind(cards)) {
    console.log('hand: three of a kind')
    return handValues.threeKind
  }
  else if (checkIfTwoPair(cards)) {
    console.log('hand: two pair')
    return handValues.twoPair
  }
  else if (checkIfPair(cards)) {
    console.log('hand: one pair')
    return handValues.pair
  }
  else {
    let highCard = getHighCard(cards)
    console.log('hand: high card')
    return highCard
  }
}

module.exports = {
  compareTwoHands: function (hand1, hand2) {
    const handOne = determineHandValue(hand1)
    const handTwo = determineHandValue(hand2)

    if (handOne === handTwo) {
      console.log('tie!')
    }
    else if (handOne > handTwo) {
      console.log('hand one wins!')
    }
    else {
      console.log('hand two wins!')
    }
  }
}













