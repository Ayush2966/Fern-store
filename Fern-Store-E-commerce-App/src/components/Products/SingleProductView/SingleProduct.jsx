import './single-product.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getProductData } from 'services';
import { isItemInCart } from "utils/cart/cart";
import { isItemnWishlist } from "utils/wishlist/wishlist";
import { useToast } from "custom-hooks/useToast";
import { useAuth } from 'contexts/index'; 
import { useProduct } from "contexts/index";
import { 
  addProductToCart,
  addProductToWishlist, 
  deleteProductFromWishlist
} from "services/index";

export const SingleProduct = () => {
  const { productId } = useParams();
  const location = useLocation();
  const [productData, setProduct] = useState({});
  useEffect(() => {
    (async () => {
      const { product } = await getProductData(productId);
      setProduct(product || {});
    })();
  }, []);
  const navigate = useNavigate();
  const {
    categoryName,
    discount,
    discountPercentage,
    discountedPrice,
    img,
    price,
    productType,
    rating,
    title,
    _id
  } = productData;
  const{state: {cart, wishlist}, dispatch} = useProduct(); 
  const {auth: {token}} = useAuth(); 
  const {showToast} = useToast();

  const isProductInCart = isItemInCart(cart, _id);
  const [actionLoading, setActionLoading] = useState(false);
  const isProductInWishlist = isItemnWishlist(wishlist, _id);

  const addToCartHandler = (product) => {
    token 
      ? isProductInCart
          ? navigate('/Cart') 
          : addProductToCart(dispatch, {product: product}, showToast, setActionLoading)
      : navigate('/Login', {state: {from: location.pathname}});
}

const addToWishlistHandler = (product) => {
    token 
        ? isProductInWishlist
            ? deleteProductFromWishlist(dispatch, _id) 
            : addProductToWishlist(dispatch, {product: product}, showToast, setActionLoading)
        : navigate('/Login', {state: {from: location.pathname}});
}
  return (
    <div className="single-product-container d-flex justify-between items-center" key={_id}>
      <div className="card-horizontal single-product-card cart-item" >
        <div className="card-image-container">
          <img
            className="responsive-img"
            src={img}
            alt={title}
          />
        </div>
        <div className="card-horizontal-content-container ">
          <div className="text-conatiner">
            <div className="card-title">{title}</div>
            <div className="card-text">{categoryName}</div>
            <div className="card-price">
              <span className="product-discounted-price">₹ {discountedPrice}</span>
              <span className="product-original-price mx-2">₹ {price}</span>
              <span className="product-discount">({discountPercentage})</span>
            </div>
          </div>
          <div className="button-container">
            <button className="bttn bttn-primary"
            disbaled={actionLoading}
            onClick={() => addToCartHandler(productData)}
            >
              <span className="bttn-icon">
                <i className="fas fa-shopping-bag"></i>
              </span>
              {isProductInCart ? "View Cart" : "Add to Cart"} 
            </button>
            <button 
              className="bttn bttn-outline-secondary text-sm"
              disbaled={actionLoading}
              onClick={() => addToWishlistHandler(productData)}
            >
              Move to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );

}