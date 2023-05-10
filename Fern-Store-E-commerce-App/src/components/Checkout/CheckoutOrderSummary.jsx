import './checkout.css';
import { logo } from 'assets';
import { useProduct, useAuth, useOrderSummary } from 'contexts';
import { getPriceDetails } from "utils/cart/cart";
import { useToast } from 'custom-hooks/useToast';
import { useNavigate } from 'react-router-dom';
import { clearCart } from 'services';

const CheckoutOrderSummary = ({ chekoutAddress, setCheckoutMsg }) => {
    const { state: { cart, address }, dispatch } = useProduct();
    const {setOrder} = useOrderSummary()
    const {auth:{user}} = useAuth();
    const {showToast} = useToast();
    const navigate = useNavigate();
    const {
        fullName,
        mobile,
        pinCode,
        city,
        houseNo,
        detailAddress,
        state
    } = chekoutAddress;
    const { 
        totalPrice, 
        priceAfterDiscount, 
        totalDiscount 
    } = getPriceDetails(cart);

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    const loadScriptForCheckout = async () => {
        return new Promise((resolve) => {
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            }
            document.body.appendChild(script);
        }
        )
    }

    const clearCartAfterCheckout = async () => {
        try{
            const {data:{cart}} = await clearCart();
            dispatch({type: 'UPDATE_CART', payload: cart});
        }
        catch(error){
            console.log(error.response.data);
        }
       
    }

    const naviagteToRazorpay = async () => {
        const response = await loadScriptForCheckout();
        if(!response){
            showToast('Error in loading Razorpay script', 'error');
        }
        const options = {
            "key": "rzp_test_Wr3xO74C8MafSa",
            "amount": priceAfterDiscount*100,
            "currency": "INR",
            "name": "Fern Store",
            "description": "Thank you for shopping with us!",
            "image": logo,
            "handler": function (response){
                const {razorpay_payment_id, razorpay_signature} = response;
                const orderSummaryObj = {
                    paymentId: razorpay_payment_id,
                    signature: razorpay_signature,
                    totalAmount: totalPrice,
                    address: {...chekoutAddress},
                    orderedItems: [...cart]
                };
                setOrder(orderSummaryObj);
                clearCartAfterCheckout();
                setCheckoutMsg('Your order has been placed successfully!');
                document.body.removeChild(script);
                setTimeout(() => { navigate('/order-summary')}, 2500)
               
            },
            "prefill": {
                "name": `${user.firstName} ${user.lastName}`,
                "email": user.email,
                "contact": "8096767880"
            },
            "theme": {
                "color": "#45523e"
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    const placeOrderHandler = () => {
        if(address.length === 0){
            showToast('Please add address', 'error');
            setTimeout(() => {
                navigate('/address');
            },
            1500);
        }else{
            fullName === undefined
                ? showToast('Please select address before checkout', 'warning')
                : naviagteToRazorpay();
        }
    }

    return (
        <aside className="checkout-summary-card">
            <div className="price-card-header bold">Order Details</div>
            <div className="items-header d-flex justify-between">
                <span>Item</span>
                <span>Quantity</span>
            </div>
            <div className='cartitem-summary'>
                {cart.map(cartItem => <div key={cartItem._id} className='d-flex justify-between'>
                    <span>{cartItem.title}</span>
                    <span>{cartItem.qty}</span>
                </div>
                )}
            </div>
            <div className="price-card-header bold">Price Details</div>
            <div className="order-body">
                <div className="order-breakup">
                    <div className="order-item">
                        <span>Bag Total</span>
                        <span>Rs. {totalPrice}</span>
                    </div>
                    <div className="order-item">
                        <span>Discount</span>
                        <span>Rs -{totalDiscount}</span>
                    </div>
                    <div className="order-item">
                        <span>Delivery</span>
                        <span>FREE</span>
                    </div>
                </div>
                <div className="order-amount d-flex justify-between bold">
                    <span>Total Amount</span>
                    <span>Rs {priceAfterDiscount}</span>
                </div>
            </div>
            <div className="price-card-header bold">Deliver To</div>
           {fullName!==undefined && <div className='address-detail'>
                <p className='semi-bold'>{fullName}</p>
                <p>{houseNo}, {detailAddress}, {city}, {state} {pinCode}</p>
                <p>Mobile - {mobile}</p>
            </div>}

            <button 
                className="bttn bttn-primary bttn-order" 
                onClick={() => placeOrderHandler()}>
            place order
            </button>
        </aside>
    )
}

export { CheckoutOrderSummary }