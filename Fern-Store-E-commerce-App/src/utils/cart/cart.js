const isItemInCart = (cart, id) => {
  return cart.find(cartItem => cartItem._id === id);
}

const getPriceDetails = (cart) => {
  return cart.reduce(
    ({totalPrice, priceAfterDiscount, totalDiscount}, item) => 
    {
      totalPrice = totalPrice+(item.price*item.qty);
      priceAfterDiscount = priceAfterDiscount+(item.discountedPrice*item.qty);
      totalDiscount = totalDiscount+((item.price-item.discountedPrice)*item.qty); 
    return {totalPrice, priceAfterDiscount, totalDiscount};
    },
    {
      totalPrice: 0,
      priceAfterDiscount: 0,
      totalDiscount: 0
    }
  );
}

const getTotalItemInCart = (cart) => {
  return cart.reduce(
    ({totalItem}, item) => {
      return {totalItem: totalItem+(item.qty)}
    },
    {
      totalItem: 0
    }
  )
}

export { isItemInCart, getPriceDetails, getTotalItemInCart };