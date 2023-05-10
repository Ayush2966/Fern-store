import { AddressForm } from "./AddressForm";
import { useState } from "react";
import { useProduct } from "contexts";
import { useToast } from 'custom-hooks/useToast';
import { getAllAddress, addAddress, updateAddress, deleteAddress } from 'services';

const Addresslist = ({
  addressList,
  // setAddressList,
  isEditable,
  openEditFormHandler
}) => {
  const {dispatch} = useProduct();
  const {showToast} = useToast();
  const [editAddress, setEditAddressFields] = useState({});

  const setEditFieldHandler = (e) => {
    const { name, value } = e.target;
    setEditAddressFields((a) => ({ ...a, [name]: value }));
  };

  const editAddressHandler = (id) => {
    openEditFormHandler();
    const newAddresslist = addressList.map(address => {
      if (address.id === id){
        setEditAddressFields(address);
        return {...address, isEdit: true};
      }
      else{
        return {...address, isEdit: false};
      }
    });
    dispatch({
      type: "SET_ADDRESS",
      payload: newAddresslist
    });
  };

  const saveEditFormHandler = async (e, editedAddress) => {
    e.preventDefault();
    try{
      const {data:{address}} = await updateAddress(editedAddress.id, { address: {...editedAddress, isEdit: false} });
      dispatch({
        type: "SET_ADDRESS",
        payload: address
      });
      showToast('Address update successful', 'success');
    }catch(error){
      showToast('Address update failed', 'error');
      console.log(error.response.data);
    }
  };

  const deleteAddressHandler = async id => {
    try{
      const {data:{address}} = await deleteAddress(id);
      dispatch({
        type: "SET_ADDRESS",
        payload: address
      });
      showToast('Address deleted successfully', 'success');
    }catch(error){
      console.log(error);
    }
  };

  return (
    <div className="addressList-container">
      <h3 className="address-title">Your Addresses</h3>
      <div className="addressList">
        {addressList.map((a) => {
          if (a.isEdit && isEditable) {
            return (
              <AddressForm
                key={a.id}
                address={editAddress}
                isEdit={true}
                formHandler={saveEditFormHandler}
                setAddressFields={setEditFieldHandler}
                cancelFormHanlder={editAddressHandler}
              />
            );
          } else
            return (
              <div className="addressList-item" key={a.id}>
                <p>{a.fullName}</p>
                <p>
                  <span>{a.houseNo}, {a.detailAddress}</span></p>
                <p><span>{a.city} - {a.pinCode}</span></p>
                <p>
                  <span>{a.state}</span>
                </p>
                <p className='my-2'>Mobile - {a.mobile}</p>
                <div className="btn-container d-flex">
                  <button
                    className="bttn text-only-btn primary-text-btn"
                    onClick={() => editAddressHandler(a.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bttn text-only-btn danger-text-btn"
                    onClick={() => deleteAddressHandler(a.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
        })}
      </div>
    </div>
  );
};

export { Addresslist }
