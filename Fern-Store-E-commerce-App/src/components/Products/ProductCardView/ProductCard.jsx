import './productCard.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useProduct } from "contexts/index";
import { 
    addProductToCart, 
    addProductToWishlist, 
    deleteProductFromWishlist
} from "services/index";
import { useAuth } from 'contexts/index'; 
import { isItemInCart } from "utils/cart/cart";
import { isItemnWishlist } from "utils/wishlist/wishlist";
import { useToast } from "custom-hooks/useToast";

const ProductCard = ({product}) => {
    const { 
        _id,
        title,
        productType, 
        rating, 
        price, 
        discountedPrice,
        img, 
        discountPercentage
    } = product;
    const navigate = useNavigate();
    const location = useLocation();
    const{state: {cart, wishlist}, dispatch} = useProduct(); 
    const {auth: {token}} = useAuth(); 
    const {showToast} = useToast();
    const [actionLoading, setActionLoading] = useState(false);

    const isProductInCart = isItemInCart(cart, _id);
    const isProductInWishlist = isItemnWishlist(wishlist, _id);

    //add items to cart
    const addToCartHandler = (product) => {
        token 
            ? isProductInCart
                ? navigate('/Cart') 
                : addProductToCart(dispatch, {product: product}, showToast, setActionLoading)
            : navigate('/Login', {state:{from: location.pathname}});
    }

    const addToWishlistHandler = (e, product) => {
        e.stopPropagation()
        token 
            ? isProductInWishlist
                ? deleteProductFromWishlist(dispatch, _id) 
                : addProductToWishlist(dispatch, {product: product}, showToast, setActionLoading)
            : navigate('/Login', {state:{from: location.pathname}});
    }

    return (
        <div className="card-vertical">
            <div className="card-image-container" onClick={() => navigate(`/Products/${_id}`)}>
                <img
                    className="responsive-img"
                    src={img}
                    alt={title}
                />
                <div className="card-badge-container">
                    <div className="badge badge-star">
                        {rating}<i className="fas fa-star star-icon"></i>
                    </div>
                </div>
                <button 
                    className={`bttn bttn-outline-secondary bttn-float-icon ${isProductInWishlist ? 'wishlist-icon' : ''}`}
                    disabled={actionLoading}
                    onClick={(e) => addToWishlistHandler(e, product)}>
                    <i className="fas fa-heart"></i>
                </button>
            </div>
            <div className="card-content-container">
                <div className="card-title" onClick={() => navigate(`/Products/${_id}`)}>{title}</div>
                <div className="card-text"> {productType} </div>
                <div className="card-price">
                    <span className="product-discounted-price">
                       Rs. {discountedPrice} 
                    </span>
                    <span className="product-price mx-2">Rs. {price}</span>
                    <span className="product-discount">({discountPercentage}%)</span>
                </div>
                <button 
                    className="bttn bttn-primary" 
                    disabled={actionLoading}
                    onClick={() => addToCartHandler(product)}>
                    <span className="bttn-icon">
                        <i className="fas fa-shopping-bag"></i>
                    </span>
                    {isProductInCart ? "View Cart" : "Add to Cart"} 
                </button>
            </div>
        </div>
    )
}

export {ProductCard};