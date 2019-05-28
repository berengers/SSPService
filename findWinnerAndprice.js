const FIRST_PRICE = "FIRST_PRICE"
const SECOND_PRICE = "SECOND_PRICE"

const findTwoBestAuctions = (buyersBids, floorPrice) => {

  if (floorPrice === undefined) {
    throw new Error()
  }

  if (buyersBids.length === 0) {
    return null
  }

  let bestBid = {
    buyerId: null,
    bid: 0
  }

  let secondBestBid = {
    buyerId: null,
    bid: 0
  }

  buyersBids.forEach(buyer => {
    buyer.bids.forEach(price => {
      
      if (price < floorPrice) {
        return
      }
      
      if (price > bestBid.bid) {

        if (buyer.buyerId !== bestBid.buyerId) {
          secondBestBid = bestBid
        }

        bestBid = { buyerId: buyer.buyerId, bid: price }
      } 
      else if (price > secondBestBid.bid) {
        secondBestBid = { buyerId: buyer.buyerId, bid: price }
      }

    })
  })

  if (bestBid.buyerId === null) {
    return null
  }

  if (secondBestBid.bid === 0) {
    secondBestBid = { buyerId: null, bid: floorPrice }
  }

  return [bestBid, secondBestBid]
}

const findBuyerAndWinningPrice = (auctionType, buyersBids, floorPrice) => {
  const [firstPrice, secondPrice] = findTwoBestAuctions(buyersBids, floorPrice) || []

  if (firstPrice === undefined) {
    return null
  }

  const buyerAndPrice = { buyerId: firstPrice.buyerId }

  if (auctionType === FIRST_PRICE) {
    buyerAndPrice.bid = firstPrice.bid
  }
  else if (auctionType === SECOND_PRICE) {
    buyerAndPrice.bid = secondPrice.bid
  }
  else {
    throw new TypeError(`"${auctionType}" is not not an auction type valid`)
  }

  return buyerAndPrice
}


module.exports = {
  findBuyerAndWinningPrice,
  findTwoBestAuctions,
  FIRST_PRICE,
  SECOND_PRICE
}


// const wrongBids = [{ buyerId: "A", bids: [12, 35, "A", 150] }, { buyerId: "B", bids: [130] }]
// console.log(findBuyerAndWinningPrice(SECOND_PRICE, wrongBids, 100))
// const usualBids = [
//   { buyerId: "A", "bids": [110, 130] },
//   { buyerId: "B", "bids": [] },
//   { buyerId: "C", "bids": [125] },
//   { buyerId: "D", "bids": [105, 115, 90] },
//   { buyerId: "E", "bids": [132, 135, 140] }
// ]

// throw an error
// console.log(findBuyerAndWinningPrice("third_price", usualBids, 100))
//throw an error
// console.log(findBuyerAndWinningPrice(SECOND_PRICE, usualBids))
// E - 130
// console.log(findBuyerAndWinningPrice(SECOND_PRICE, usualBids, 100))
// console.log(findBuyerAndWinningPrice(0, usualBids, 100))
// console.log(findBuyerAndWinningPrice(2, usualBids, 100))
// // Error because bids under reserved price
// console.log(findBuyerAndWinningPrice(usualBids, 1000))
// // Error because no buyer
// console.log(findBuyerAndWinningPrice([], 100))
// console.log()