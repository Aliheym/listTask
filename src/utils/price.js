export function calculatePrice(count, price, issues = {}) {
  if (issues[count] !== undefined) {
    return issues[count];
  }

  return price * count;
}
