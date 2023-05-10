import axios from 'axios';

const addressBaseUrl = '/api/user/address';

const getAllAddress = async (data) => {
  const token = localStorage.getItem("token");
  const Headers = {authorization: token};
  return await axios.get(addressBaseUrl, {headers: Headers}); 
}

const addAddress = async (data) => {
  const token = localStorage.getItem("token");
  const Headers = {authorization: token};
  return await axios.post(addressBaseUrl, data, {headers: Headers}); 
}

const updateAddress = async (addressId, data) => {
  const token = localStorage.getItem("token");
  const Headers = {authorization: token};
  return await axios.post(addressBaseUrl+'/'+addressId, data, {headers: Headers});
}

const deleteAddress = async (addressId) => {
  const token = localStorage.getItem("token");
  const Headers = {authorization: token};
  return await axios.delete(addressBaseUrl+'/'+addressId, {headers: Headers});
}

export {getAllAddress, addAddress, updateAddress, deleteAddress}