import {clamp, totalVotes, sortCardsByVotes} from './utils'

describe('clamp', () => {
  it('limits to the minimum', () => {
    expect(clamp(10, [15, 30])).toEqual(15)
  })
  it('limits to the maximum', () => {
    expect(clamp(100, [15, 30])).toEqual(30)
  })
})

describe('totalVotes', () => {
  it('returns the votes of a given card', () => {
    expect(totalVotes({name: 'a', votes: 7})).toEqual(7)
  })

  it('returns 0 when there are no votes', () => {
    expect(totalVotes({name: 'a'})).toEqual(0)
  })

  it('returns the sum of the votes from the card and its subcards', () => {
    const cardWithSubCards = {
      name: 'd',
      votes: 3,
      subCards: {
        b: {name: 'd1', votes: 4},
        bb: {name: 'd2', votes: 4},
      },
    }
    expect(totalVotes(cardWithSubCards)).toEqual(11)
  })
})

describe('sortCardsByVotes', () => {
  const fixtureCards = {
    a: {name: 'a', votes: 10},
    aa: {name: 'b'},
    aaa: {name: 'c', votes: 12},
    aaaa: {
      name: 'd',
      votes: 3,
      subCards: {
        b: {name: 'd1', votes: 4},
        bb: {name: 'd2', votes: 4},
      },
    },
  }

  it('sorts the top level cards (not subCards) by total votes', () => {
    // TODO: Currently only a shallow sort, you'll still need to sort the subCards
    expect(sortCardsByVotes(fixtureCards)).toEqual([
      {name: 'c', id: 'aaa', votes: 12},
      {
        name: 'd',
        id: 'aaaa',
        votes: 3, // Effective number of votes = 3 + 4 + 4 = 11
        subCards: {
          b: {name: 'd1', votes: 4},
          bb: {name: 'd2', votes: 4},
        },
      },
      {name: 'a', id: 'a', votes: 10},
      {name: 'b', id: 'aa'},
    ])
  })

  it('returns an empty array if no card is given', () => {
    expect(sortCardsByVotes(undefined)).toEqual([])
  })
})
