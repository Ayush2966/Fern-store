import './address.css';
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useProduct } from 'contexts';
import { useToast } from 'custom-hooks/useToast';
import { AddressForm } from './AddressForm';
import { Addresslist } from './Addresslist';
import { addAddress } from 'services';
import { useLocation, useNavigate } from 'react-router-dom';

export const Address = () => {
    const formField = {
        fullName: "",
        mobile: "",
        pinCode: "",
        city: "",
        houseNo: "",
        detailAddress: "",
        state: "",
        isEdit: false
    };
    const { dispatch, state: { address }, setLoader } = useProduct();
    const [addressFields, setAddress] = useState(formField);
    const {showToast} = useToast();
    const [newAddress, setNewAddress] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location?.state?.from || '';
    const isAddNewAddressFromCheckout = location?.state?.isAddnewAddress;

    const setAddressFields = (e) => {
        const { value, name } = e.target;
        setAddress({
            ...addressFields,
            [name]: value
        })
    }    

    const cancelFormHanlder = () => {
        setNewAddress(false);
        setAddress(formField);
    };

    const formHandler = async (e, addressText) => {
        e.preventDefault();
        try {
            const { data: { address } } = await addAddress({ address: { id: uuid(), ...addressText } });
            dispatch({
                type: "SET_ADDRESS",
                payload: address
            });
            setNewAddress(false);
            setAddress(formField);
            
            if(from==='/checkout' && isAddNewAddressFromCheckout){
                showToast('Address added successfully, redirected to checkout', 'success');
                setLoader(true);
                setTimeout(() => {
                    navigate(from, {replace: true});
                    setLoader(false);
                }, 1400);
            }
            else{
                showToast('Address added succesfully', 'success');
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    const dummyAddressFormHandler = async (e, dummyAddress) => {
        e.preventDefault();
        setAddress(dummyAddress);
        formHandler(e, dummyAddress);
    }

    const openEditFormHandler = () => {
        setIsEditable(prevState => !prevState);
    }

    return (
        <div className="wishlist-wrapper">
            <div className="wishlist-container d-flex flex-col items-center">
                <h5 className="wishlist-header py-4">Address Management</h5>
                {!newAddress && (
                    <button onClick={() => setNewAddress(a => !a)} className="bttn bttn-primary">
                        + Add a new address
                    </button>
                )}
                {newAddress && (
                    <AddressForm
                        formHandler={formHandler}
                        setAddressFields={setAddressFields}
                        address={addressFields}
                        isEdit={false}
                        cancelFormHanlder={cancelFormHanlder}
                        dummyAddressFormHandler={dummyAddressFormHandler}
                    />
                )}
                <div className='addresslist-wrapper d-flex justify-center'>
                    {address.length > 0 && (
                        <Addresslist
                            addressList={address}
                            // setAddressList={setAddressList}
                            openEditFormHandler={openEditFormHandler}
                            isEditable={isEditable}
                        />
                    )}
                </div>

            </div>
        </div>
    )
}