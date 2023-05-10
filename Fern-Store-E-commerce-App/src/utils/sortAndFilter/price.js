export const getProductsInPriceRange = (data, priceValue) => {
    return data.filter(product => product.price <= priceValue);
};