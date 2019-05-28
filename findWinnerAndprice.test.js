const chai = require('chai')
const expect = require('chai').expect
const dirtyChai = require('dirty-chai')

const myMethods = require('./findWinnerAndprice');
const { findBuyerAndWinningPrice, findTwoBestAuctions, FIRST_PRICE, SECOND_PRICE } = myMethods

chai.use(dirtyChai)


const usualBids = [
  { buyerId: "A", "bids": [110, 130] },
  { buyerId: "B", "bids": [] },
  { buyerId: "C", "bids": [125] },
  { buyerId: "D", "bids": [105, 115, 90] },
  { buyerId: "E", "bids": [132, 135, 140] }
]


describe('findBuyerAndWinningPrice should return an object whith a buyer id and one price:', () => {
  it('second price -- should return an object whith Buyer E and Price 130', () => {
    expect(findBuyerAndWinningPrice(SECOND_PRICE, usualBids, 100)).to.be.an('object').with.property('bid').to.equal(130)
  })

  it('first price -- should return an object whith Buyer E and Price 130', () => {
    expect(findBuyerAndWinningPrice(FIRST_PRICE, usualBids, 100)).to.be.an('object').with.property('bid').to.equal(140)
  })

  it('just one buyer have bid above reserve -- should return this buyer with reserve price', () => {
    expect(findBuyerAndWinningPrice(SECOND_PRICE, usualBids, 136)).to.be.an('object').with.property('bid').equal(136)
  })

  it('buyers bids under reserve price -- should return null', () => {
    expect(findBuyerAndWinningPrice(SECOND_PRICE, usualBids, 1000)).to.be.null()
  })

  it('no buyers -- should return null', () => {
    expect(findBuyerAndWinningPrice(SECOND_PRICE, [], 100)).to.be.null()
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