export function calculatePrice(count, price, discount, discountRepeat) {
  let totalPrice = price * count;

  if (discountRepeat) {
    totalPrice -= Math.floor(count / discountRepeat) * discount;
  }

  return totalPrice;
}
