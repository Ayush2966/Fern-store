import './order-summary.css';
import { useOrderSummary } from "contexts";
import { CartItem } from 'components';

const OrderSummary = () => {
  const { order: { 
    orderedItems, 
    address:{
      fullName,
      mobile,
      pinCode,
      city,
      houseNo,
      detailAddress,
      state
    },
    totalAmount,
    paymentId,
 } } = useOrderSummary();
  return (
    <div className="general-wrapper">
      <div className="cart-wrapper items-center">
        <h5 className="cart-header py-4">Order Summary</h5>
        <div className="order-summary-body d-flex">
          <div className="cart-item-list">
            {orderedItems?.map(item => <CartItem key={item.id} cartItem={item} />)}
          </div>
          <div className="order-detail d-flex flex-col">
            <p className='order-detail-title bold text-success'>Order Confirmed</p>
            <div className="payment-detail">
              <p className='no-margin-p'>Payment Id  <span className='bold'>{paymentId}</span></p>
              <p className='no-margin-p'>Total Amount  <span className='semi-bold'>₹{totalAmount}</span> </p>
            </div>
            <p className='order-detail-title bold'>Shipping Details</p>
            <div className="shipping-detail">
              <p className='semi-bold'>{fullName}</p>
              <p>{houseNo}, {detailAddress}, {city}, {state} {pinCode}</p>
              <p>Mobile - {mobile}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { OrderSummary }