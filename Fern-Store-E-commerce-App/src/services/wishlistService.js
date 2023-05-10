import axios from 'axios';

const wishlistBaseUrl = '/api/user/wishlist';

const addProductToWishlist = async (dispatch, data, showToast, setActionLoading) => {
  const token = localStorage.getItem("token");
  const Headers = { authorization: token };
  try {
    setActionLoading(true);
    const { data: { wishlist }} = await axios.post(wishlistBaseUrl, data, { headers: Headers });
    dispatch({ type: 'UPDATE_WISHLIST', payload: wishlist });
    showToast('Added to your wishlist', 'success');
    setActionLoading(false);
  }
  catch (error) {
    console.log(error.message);
  }
}

const deleteProductFromWishlist = async (dispatch, id, setActionLoading) => {
  const token = localStorage.getItem("token");
  const Headers = { authorization: token };
  const { data: { wishlist } } = await axios.delete(`${wishlistBaseUrl}/${id}`, { headers: Headers });
  dispatch({ type: 'UPDATE_WISHLIST', payload: wishlist });
}

export { addProductToWishlist, deleteProductFromWishlist };