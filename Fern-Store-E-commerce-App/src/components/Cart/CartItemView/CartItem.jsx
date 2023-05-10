import { 
  updateCartItem, 
  deleteCartItem, 
  addProductToWishlist } from 'services';
import { useProduct } from 'contexts';
import { useLocation } from 'react-router-dom';
import { useToast } from 'custom-hooks/useToast';
import { useState } from 'react';

const CartItem = ({cartItem}) => {
  const {
    img, title, categoryName, discountedPrice, price, discountPercentage, qty, _id
  } = cartItem;
  const {state:{wishlist}, dispatch} = useProduct();
  const {showToast} = useToast();
  const location = useLocation();
  const pageLocation = location.pathname;
  const [isActionLoading, setActionLoading] = useState(false);

  const updateCartItemHandler = (id, data) => {
    updateCartItem(dispatch, id, data, setActionLoading);
  }

  const wishlistHandler = (product) => {
   const item = wishlist.find(wishlistItem => wishlistItem._id === product._id);
    if(item) 
      showToast('Item already present in wishlist', 'warning');
    else{
      deleteCartItem(dispatch, product._id);
      addProductToWishlist(dispatch, {product: product}, showToast, setActionLoading);
    }
  }

  return (
    // <div className="cart-item-list">
          <div className="card-horizontal cart-item" key={_id}>
            <div className="card-image-container">
              <img
                className="responsive-img"
                src={img}
                alt={title}
              />
            </div>
            <div className="card-horizontal-content-container">
              <button className="btn-close py-2" id="close-btn-alert"
                onClick={() => deleteCartItem(dispatch, _id)}>
                <i className="fas fa-times" aria-hidden="true"></i>
              </button>
              <div className="text-conatiner">
                <div className="card-title">{title}</div>
                <div className="card-text">{categoryName}</div>
                <div className="card-price">
                  <span className="product-discounted-price">₹ {discountedPrice}</span>
                  <span className="product-original-price mx-2">₹ {price}</span>
                  <span className="product-discount">({discountPercentage}%)</span>
                </div>
                {pageLocation!=='/order-summary' && <div className="button-container my-2 items-center">
                  <button className="bttn text-sm icon-btn" 
                    // disabled={qty <=1 ? true : false}
                    disabled={isActionLoading}
                    onClick={() => qty>1 && updateCartItemHandler(_id, { action: { type: 'decrement' } })}
                  >
                    <i className='fas fa-minus'></i>
                  </button>
                  <div className="">{qty}</div>
                  <button className="bttn text-sm icon-btn"
                    disabled={isActionLoading}
                    onClick={() => updateCartItemHandler(_id, { action: { type: 'increment' } })}
                  >
                    <i className='fas fa-plus'></i>
                  </button>
                </div>}
              </div>
              {pageLocation!=='/order-summary' && <div className="button-container">
                <button className="bttn bttn-outline-secondary text-sm"
                  onClick={() => wishlistHandler(cartItem)}>
                  Move to Wishlist
                </button>
              </div>}
            </div>
          </div>
    // </div>
  )
}

export {CartItem};