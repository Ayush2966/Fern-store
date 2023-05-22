

const AddressForm = ({
  formHandler,
  address,
  setAddressFields,
  isEdit,
  cancelFormHanlder,
  dummyAddressFormHandler
}) => {
  const dummyAddress ={
    fullName: 'Ayush Jain',
    mobile: '90323xxxxx',
    houseNo: '420-B/02',
    detailAddress: 'Hue Hue Nagar, Hue Street',
    pinCode: '12001',
    city: 'Jaipur',
    state: 'Rajasthan'
  }

  return (
    <div className="address-table-container">
      <form className="address-form" onSubmit={(e) => formHandler(e, address)}>
        {isEdit ? <h5 className="text-center">EDIT ADDRESS</h5> : <h5 className="text-center">ADD NEW ADDRESS</h5>}
        <div className="row">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={address.fullName}
            onChange={setAddressFields}
            className="input-section"
            required
          />
          <input
            type="text"
            name="mobile"
            placeholder="Phone No"
            value={address.mobile}
            onChange={setAddressFields}
            className="input-section"
            required
          />
           <input
            type="text"
            name="houseNo"
            placeholder="House No"
            value={address.houseNo}
            onChange={setAddressFields}
            className="input-section"
            required
          />
          <input
            type="text"
            name="detailAddress"
            placeholder="Colony, street no"
            value={address.detailAddress}
            onChange={setAddressFields}
            className="input-section"
            required
          />
           <input
            type="text"
            name="pinCode"
            placeholder="Pin Code"
            value={address.pinCode}
            onChange={setAddressFields}
            className="input-section"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={setAddressFields}
            className="input-section"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={address.state}
            onChange={setAddressFields}
            className="input-section"
          />
        </div>
       {!isEdit && <button className="bttn bttn-primary" onClick={(e) => dummyAddressFormHandler(e, dummyAddress)}>
          Dummy Address
        </button>}
        <button className="bttn bttn-primary" type="submit" value="Submit">
          Save Address
        </button>
        <button
          className="bttn bttn-secondary"
          onClick={() => cancelFormHanlder()}
        >
          Cancel Address
        </button>
      </form>
    </div>
  );
};
export { AddressForm}
