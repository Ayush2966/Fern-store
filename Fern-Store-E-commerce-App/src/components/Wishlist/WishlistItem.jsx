import { useProduct } from "contexts/index"; 
import { isItemInCart } from "utils/cart/cart";
import { 
  addProductToCart, 
  deleteProductFromWishlist, 
  updateCartItem
} from "services/index";

const WishlistItem = ({item}) => {
  const {
    _id, 
    title, 
    categoryName, 
    img,
    price,
    discountedPrice,
    discountPercentage,
  } = item;

  const { state: {cart}, dispatch } = useProduct();

  const isProductInCart = isItemInCart(cart, _id);
  
  const moveToBagHandler = (wishlistItem) => {
    if(isProductInCart)
      updateCartItem(dispatch, _id, {action: { type: 'increment' }});
    else{
      addProductToCart(dispatch, {product: wishlistItem});
      deleteProductFromWishlist(dispatch, _id);
    }
  }
  return (
    <div className="card-vertical">
      <div className="card-image-container">
        <img
          className="responsive-img"
          src={img}
          alt={title}
        />
        <button className="bttn bttn-outline-secondary bttn-float-icon wishlist-icon"
          onClick={() => deleteProductFromWishlist(dispatch, _id)}>
          <i className="fas fa-heart"></i>
        </button>
      </div>
      <div className="card-content-container">
        <div className="card-title">{title}</div>
        <div className="card-text">{categoryName}</div>
        <div className="card-price">
          <span className="product-discounted-price">Rs. {discountedPrice}</span>
          <span className="product-original-price">Rs. {price}</span>
          <span className="product-discount">({discountPercentage})</span>
        </div>
        <button className="bttn bttn-secondary"
          onClick={() => moveToBagHandler(item)}>
          <span className="bttn-icon"><i className="fas fa-shopping-bag"></i></span>
          Move to Bag
        </button>
      </div>
    </div>
  )
}

export { WishlistItem }