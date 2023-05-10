
import { CheckoutOrderSummary} from './CheckoutOrderSummary';
import {useProduct} from 'contexts';
import { useState } from 'react';   
import { useLocation, useNavigate } from 'react-router-dom';

const Checkout  = () => {
    const {state:{address, cart}} = useProduct();
    const [chekoutAddress, setCheckoutAddress] = useState({});
    const [checkoutMsg, setCheckoutMsg] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    console.log(address);

    return (
        <div className="general-wrapper">
        {checkoutMsg!=='' 
            ? <h3 className="checkout-msg">{checkoutMsg}</h3> 
            : (
          <div className="cart-wrapper">
            <h5 className="cart-header py-4">Checkout</h5>
            {cart.length>0 && <div className="cart-body d-flex">
                <div className="address-option">
                {address.map(address => <div key={address._id} className='address-item'>
                    <label htmlFor="address" className='semi-bold d-flex items-center'>
                        <input className='radio-input' type="radio" name="address" id="address" value={address} 
                            onChange={e => setCheckoutAddress(address)}/>
                        {address.fullName}
                    </label>
                    <div className="address-detail">
                        <p>{address.houseNo}, {address.detailAddress}, {address.city} </p>
                        <p>{address.state}</p>
                        <p>{address.pinCode}</p>
                        <p>Mobile - {address.mobile}</p>
                    </div>
                </div>)}
                <p className='bold' onClick={() => navigate('/address', {state: {from: location.pathname, isAddnewAddress: true}} )}>+ Add New Address</p>
                </div>
                <CheckoutOrderSummary chekoutAddress={chekoutAddress} setCheckoutMsg={setCheckoutMsg}/>
            </div>}
          </div>)
        }
        </div>
      );
}

export {Checkout }