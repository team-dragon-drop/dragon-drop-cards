export function clamp(val, [min, max]) {
  return Math.min(Math.max(min, val), max);
}

export function totalVotes(card) {
  return Object.keys(card.subCards || {}).reduce(
    (total, key) => total + card.subCards[key].votes,
    card.votes || 0
  );
}

export function sortCardsByVotes(cards) {
  return Object.keys(cards || {}).map(id => ({ ...cards[id], id }));
}
