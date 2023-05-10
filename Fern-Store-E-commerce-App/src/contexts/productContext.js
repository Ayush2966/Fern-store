import axios from "axios";
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState
} from "react";
import { useAuth } from "contexts";
import { productReducer } from 'reducers/productReducer';

const ProductContext = createContext();
const useProduct = () => useContext(ProductContext);
const initialState = {
  sortBy: "",
  categories: {},
  priceRange: 1299,
  starRating: "",
  searchText: "",
  cart: [],
  wishlist: [],
  products: [],
  address: [],
};
const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  const [loader, setLoader] = useState(false);
  const {auth} = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const { data: { categories } } = await axios.get('/api/categories');
        dispatch({
          type: "INIT_CATEGORIES",
          payload: categories
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
        try{
            setLoader(true);
            const {data : {products}} = await axios.get('/api/products');
            dispatch({
                type: "INIT_PRODUCTS", 
                payload: products
            });
            setLoader(false);
        }catch(error){
        console.log(error);
        }
    })();
  }, []);

  useEffect(() => {
    if (auth.token) {
      let address = auth.user.address;
      address && dispatch({
        type: "SET_ADDRESS",
        payload: address
      });
    }
  }, [auth.token]);

  return (
    <ProductContext.Provider value={{ state, dispatch, loader, setLoader }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContextProvider, useProduct };
