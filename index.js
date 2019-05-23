function findWinnerAndprice (buyersBids, reservePrice) {

  if (buyersBids.length === 0) {
    return {
      "error": "no buyer"
    }
  }
  
  const highestPrices = []

  for (let index = 0; index < buyersBids.length; index++) {

    if (buyersBids[index].bids.length === 0) {
      continue
    }

    const buyer = buyersBids[index];
    const highestPrice = Math.max(...buyer.bids)
    highestPrices.push({
      "id": buyer.id,
      "bid": highestPrice
    })
  }

  highestPrices.sort((a, b) => {
    if (a.bid < b.bid)
      return 1
    else if (a.bid > b.bid)
      return -1
    else
      return 0
  })


  if (highestPrices[0].bid < reservePrice) {
    return {
      "error": "bids unders reserve price"
    }
  }

  return {
    "id": highestPrices[0].id,
    "bid": highestPrices[1].bid < reservePrice ? reservePrice : highestPrices[1].bid
  }
}

const buyersBids = [
  {
    "id": "A",
    "bids": [110, 130]
  },
  {
    "id": "B",
    "bids": []
  },
  {
    "id": "C",
    "bids": [125]
  },
  {
    "id": "D",
    "bids": [105, 115, 90]
  },
  {
    "id": "E",
    "bids": [132, 135, 140]
  }
]


// E - 130
console.log(findWinnerAndprice(buyersBids, 100))
// Error because bids under reserved price
console.log(findWinnerAndprice(buyersBids, 1000))
// Error because no buyer
console.log(findWinnerAndprice([], 100))