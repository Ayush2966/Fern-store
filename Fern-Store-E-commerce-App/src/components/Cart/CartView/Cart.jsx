import './cart.css';
import { useProduct } from 'contexts/index';
import { CartItem } from "components/Cart/CartItemView/CartItem";
import { OrderDetail } from "components/Cart/OrderDetailsView/OrderDetail";
import { getTotalItemInCart } from "utils/cart/cart";

const Cart = () => {
  const { state: { cart } } = useProduct();
  const { totalItem } = getTotalItemInCart(cart);

  return (
    <div className="general-wrapper">
      <div className="cart-wrapper">
        <h5 className="cart-header py-4">My Cart </h5>
        
        {cart.length === 0 && <h3 className="text-center">Your cart is empty!</h3>}
        <div className="cart-body">
          <div className="cart-item-list">
            {cart.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />)}
          </div>
          {cart.length > 0 && <OrderDetail />}
        </div>
      </div>
    </div>
  );
}

export { Cart }