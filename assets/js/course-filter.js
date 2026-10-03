export function courseMatches(card, state) {
  if (state.q && !card.search.includes(state.q)) return false;
  return Object.entries(state.filters).every(([key, values]) => values.length === 0 || values.some(value => card[key].split(/\s+/).includes(value)));
}
