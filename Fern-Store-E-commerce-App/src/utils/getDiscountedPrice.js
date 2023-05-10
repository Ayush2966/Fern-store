const getDiscountedPrice = (price, discountPercentage) => {
  return Math.floor(price - (price*discountPercentage/100).toFixed(2) );
}
export {getDiscountedPrice}