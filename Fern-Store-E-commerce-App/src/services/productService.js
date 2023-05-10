import axios from "axios";

const getProductData = async id => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    return data;
  } catch (e) {
    console.log(e);
  }
};
export { getProductData };