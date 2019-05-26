const findWinnerAndprice = (buyersBids, reservePrice) => {

  if (!buyersBids || !reservePrice) {
    throw new TypeError(`Missing argument: ${!buyersBids ? 'buyersBids ':''}${!reservePrice ? 'reservePrice':''}`);
  }

  if (reservePrice <= 0) {
    throw new TypeError(`The reserve price must have to be above 0 not ${reservePrice}`)
  }

  if (buyersBids.length === 0) {
    return {
      "error": "no buyer"
    }
  }
  
  const highestPrices = findValidHighestPrices(buyersBids, reservePrice)
  
  if (highestPrices.length === 0) {
    return {
      "error": "every buyers are under the reserve price"
    }
  }

  if (highestPrices.length === 1) {
    return {
      "id": highestPrices[0].id,
      "bid": reservePrice
    }
  }

  highestPrices.sort((a, b) => {
    if (a.bid < b.bid)
      return 1
    else if (a.bid > b.bid)
      return -1
    else
      return Math.round(Math.random()) === 0 ? -1 : 1
  })


  return {
    "id": highestPrices[0].id,
    "bid": highestPrices[1].bid
  }
}

const findValidHighestPrices = (buyersBids, reservePrice) => {
  const highestPrices = []

  for (let index = 0; index < buyersBids.length; index++) {

    if (buyersBids[index].bids.length === 0) {
      continue
    }

    const buyer = buyersBids[index];
    const highestPrice = Math.max(...buyer.bids)

    if (isNaN(highestPrice) || highestPrice < reservePrice) {
      continue
    }

    highestPrices.push({
      "id": buyer.id,
      "bid": highestPrice
    })
  }

  return highestPrices
}


module.exports = {
  findWinnerAndprice,
  findValidHighestPrices
}


// const buyersBids = [
//   { "id": "A", "bids": [110, 130] },
//   { "id": "B", "bids": [] },
//   { "id": "C", "bids": [125] },
//   { "id": "D", "bids": [105, 115, 90] },
//   { "id": "E", "bids": [132, 135, 140] }
// ]

// // E - 130
// console.log(findWinnerAndprice(buyersBids, 100))
// // Error because bids under reserved price
// console.log(findWinnerAndprice(buyersBids, 1000))
// // Error because no buyer
// console.log(findWinnerAndprice([], 100))