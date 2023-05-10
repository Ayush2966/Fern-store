const isItemnWishlist = (wishlist, id) => {
  return wishlist.find(iteInWishlist => iteInWishlist._id === id);
}

export {isItemnWishlist}