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

  const buyerAndWinningPrice = { buyerId: firstPrice.buyerId }

  if (auctionType === FIRST_PRICE) {
    buyerAndWinningPrice.winningPrice = firstPrice.bid
  }
  else if (auctionType === SECOND_PRICE) {
    buyerAndWinningPrice.winningPrice = secondPrice.bid
  }
  else {
    throw new TypeError(`"${auctionType}" is not not an auction type valid`)
  }

  return buyerAndWinningPrice
}


module.exports = {
  findBuyerAndWinningPrice,
  findTwoBestAuctions,
  FIRST_PRICE,
  SECOND_PRICE
}