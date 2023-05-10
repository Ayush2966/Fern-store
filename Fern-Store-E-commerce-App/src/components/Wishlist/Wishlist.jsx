import './wishlist.css';
import { useProduct } from "contexts/index";
import { WishlistItem } from "components/Wishlist/WishlistItem";

const Wishlist = () => {
  const { state: {wishlist} } = useProduct();
  return (
    <div className="wishlist-wrapper">
      <div className="wishlist-container">
        <h5 className="wishlist-header py-4">Your Wishlist</h5>
        <div className="wishlist justify-center">
          {wishlist.map(wishlistItem => <WishlistItem item={wishlistItem} key={wishlistItem._id}/>)}
        </div>
      </div>
    </div>
  )
}

export { Wishlist }