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


// describe('findValidHighestPrices should return each buyer with this highest price (higher to the reserve price)', () => {
//   it('normal case -- should return a list with buyers and their highest price', () => {
//     expect(findValidHighestPrices(usualBids)).to.be.an('array').with.length(4)
//     expect(findValidHighestPrices(usualBids)).to.deep.equal([{"id":"A","bid":130},{"id":"C","bid":125},{"id": "D","bid":115},{"id": "E","bid":140}])
//   })

//   it('bids 0, negative or under reserve price -- should only return buyer with bid above or equal reseve price', () => {
//     const negativeBids = [
//       { "id": "A", "bids": [-110, -130] },
//       { "id": "B", "bids": [150, 120] },
//       { "id": "C", "bids": [0, 0] },
//       { "id": "D", "bids": [90, 50] }
//     ]

//     expect(findValidHighestPrices(negativeBids, 100)).to.be.an('array').with.length(1)
//     expect(findValidHighestPrices(negativeBids, 100)).to.deep.include({ "id":"B", "bid":150 }, "Just the buyer D have necessary bids")
//   })

//   it('bid other than integer -- should not return this buyer', () => {
//     const badBids = [
//       { "id": "A", "bids": [150, 'a'] },
//       { "id": "B", "bids": [120] }
//     ]

//     expect(findValidHighestPrices(badBids, 100)).to.be.an('array').with.length(1)
//     expect(findValidHighestPrices(badBids, 100)).to.deep.include({ "id": "B", "bid": 120 })
//   })
// })


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


  // describe('missing arguments throw error', () => {
  //   it('missing reserve price', () => {
  //     expect(findBuyerAndWinningPrice(usualBids)).to.throw()
  //   })
  // })
})