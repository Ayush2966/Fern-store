import './productListing.css';

import { useState } from 'react';
import {useProduct} from 'contexts/index';
import {SidebarFilter} from 'components/Products/SidebarFilterView/SidebarFilter';
import {ProductCard} from 'components/Products/ProductCardView/ProductCard';
import {
    getSortedData,
    getProductsInPriceRange,
    getCateogrisedProducts,
    getDatainStarRatingRange,
    getSearchedProduct
  } from 'utils/sortAndFilter/index';


const ProductListing = () => {
    const [mobileFilterState, setFilterState] = useState(false);
const {state : {
        sortBy, 
        categories, 
        priceRange, 
        products, 
        starRating,
        searchText
    }, 
} = useProduct();

const categorisedProducts = getCateogrisedProducts(products, categories);
const productsInStarRating = getDatainStarRatingRange(categorisedProducts, starRating);
const productsInPriceRange = getProductsInPriceRange(productsInStarRating, priceRange);
const searchedProducts = getSearchedProduct(productsInPriceRange, searchText)
const filteredProducts = getSortedData(searchedProducts, sortBy);
    return (
        <>
            <div className="general-wrapper">
                <div className="product-page">
                        <SidebarFilter mobileFilterState={mobileFilterState} setFilterState={setFilterState}/>
                    <div className="product-container">
                        <h5 className="product-header py-4">Products</h5>
                        <div className="product-list">
                            {filteredProducts.map(product => (
                                <ProductCard product={product} key={product._id}/>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mobile-filter">
                    <button 
                        className='mobile-filter-btn bold text-center'
                        onClick={() => setFilterState(true)}>Filter <i className='fas fa-angel-up'></i></button>
                </div>
            </div>
        </>
    );
}
export {ProductListing}