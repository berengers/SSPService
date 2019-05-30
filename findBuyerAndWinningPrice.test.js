const expect = require('chai').expect

const myMethods = require('./findBuyerAndWinningPrice');
const { findBuyerAndWinningPrice, findTwoBestAuctions, FIRST_PRICE, SECOND_PRICE } = myMethods


const usualBids = [
  { buyerId: "A", bids: [110, 130] },
  { buyerId: "B", bids: [] },
  { buyerId: "C", bids: [125] },
  { buyerId: "D", bids: [105, 115, 90] },
  { buyerId: "E", bids: [132, 135, 140] }
]


describe('findTwoBestAuctions should return an array with two best auctions', () => {
  it('usual case -- should return an array whith 2 objects', () => {
    expect(findTwoBestAuctions(usualBids, 100)).to.be.an('array').with.length(2)
    expect(findTwoBestAuctions(usualBids, 100)[0]).to.be.an('object')
    expect(findTwoBestAuctions(usualBids, 100)[1]).to.be.an('object')
  })
  
  it('usual case -- should return an object with the biggest bid with this buyer (E 140) in first position to the array', () => {
    expect(findTwoBestAuctions(usualBids, 100)[0]).to.eql({ buyerId: "E", bid: 140 })
  })
  
  it('usual case -- should return an object with the second biggest bid with this buyer (A 130) in second position to the array', () => {
    expect(findTwoBestAuctions(usualBids, 100)[1]).to.eql({ buyerId: 'A', bid: 130 })
  })

  it('buyers bids under reserve price -- should return null', () => {
    expect(findTwoBestAuctions(usualBids, 1000)).to.be.null
  })

  it('no buyers -- should return null', () => {
    expect(findTwoBestAuctions([], 100)).to.be.null
  })

  describe('wrong argument throw an error', () => {
    it('no floorPrice -- should return an Error', () => {
      expect(() => findTwoBestAuctions(usualBids)).to.throw(Error)
    })
  })
})


describe('findBuyerAndWinningPrice should return an object whith the winning price and this buyer id:', () => {
  it('second price -- should return an object whith the winning Buyer and the second biggest winningPrice (E 130)', () => {
    expect(findBuyerAndWinningPrice(SECOND_PRICE, usualBids, 100)).to.eql({ buyerId: 'E', winningPrice: 130 })
  })

  it('first price -- should return an object whith the winning Buyer and the biggest winningPrice (E 140)', () => {
    expect(findBuyerAndWinningPrice(FIRST_PRICE, usualBids, 100)).to.eql({ buyerId: 'E', winningPrice: 140 })
  })

  it('just one buyer have bid above reserve -- should return this buyer with reserve price', () => {
    const oneBuyerAbove = [{buyerId: "A", bids: [20]}, {buyerId: "B", bids: [150]}, {buyerId: "C", bids: [10]}]
    const reservePrice = 100
    expect(findBuyerAndWinningPrice(SECOND_PRICE, oneBuyerAbove, reservePrice)).to.be.an('object').with.property('winningPrice').equal(reservePrice)
  })

  it('buyers bids under reserve price -- should return null', () => {
    expect(findBuyerAndWinningPrice(SECOND_PRICE, usualBids, 1000)).to.be.null
  })

  it('no buyers -- should return null', () => {
    expect(findBuyerAndWinningPrice(SECOND_PRICE, [], 100)).to.be.null
  })


  describe('wrong argument throw an error', () => {
    it('no floorPrice -- should return an Error', () => {
      expect(() => findBuyerAndWinningPrice(SECOND_PRICE, usualBids)).to.throw(Error)
    })

    it('wrong type auctionType -- should return a TypeError', () => {
      expect(() => findBuyerAndWinningPrice("THIRD_PRICE", usualBids, 100)).to.throw(TypeError)
    })
  })
})