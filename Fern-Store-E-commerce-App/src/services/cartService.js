import axios from 'axios';

const cartBaseUrl = '/api/user/cart';

const addProductToCart = async (dispatch, data, showToast, setActionLoading) => {
  const token = localStorage.getItem("token");
  const Headers = { authorization: token };
  try {
    setActionLoading(true);
    const { data: { cart } } = await axios.post(cartBaseUrl, data, { headers: Headers });
    dispatch({ type: 'UPDATE_CART', payload: cart });
    showToast('Added to cart!', 'success');
    setActionLoading(false);
  } catch (error) {
    console.log(error.message);
  }
}

const updateCartItem = async (dispatch, id, data, setActionLoading) => {
  const token = localStorage.getItem("token");
  const updateCartItemQuantityUrl = '/api/user/cart/';
  const Headers = { authorization: token };
  try {
    setActionLoading(true);
    const { data: { cart } } = await axios.post(updateCartItemQuantityUrl + id, data, { headers: Headers });
    dispatch({ type: 'UPDATE_CART', payload: cart });
    setActionLoading(false);
  } catch (error) {
    console.log(error.message);
  }
}

const deleteCartItem = async (dispatch, id) => {
  const token = localStorage.getItem("token");
  const deleteCartItemBaseUrl = '/api/user/cart/';
  const Headers = { authorization: token };
  try {
    const { data: { cart } } = await axios.delete(deleteCartItemBaseUrl + id, { headers: Headers });
    dispatch({ type: 'UPDATE_CART', payload: cart });
  } catch (error) {
    console.log(error.message);
  }
}

const clearCart = async () => {
  const token = localStorage.getItem("token");
  const Headers = { authorization: token };
  return await axios.delete('/api/user/carts', { headers: Headers });
}

export { addProductToCart, updateCartItem, deleteCartItem, clearCart }