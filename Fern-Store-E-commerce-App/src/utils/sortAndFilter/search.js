export const getSearchedProduct = (products, searchText) => {
    if(searchText==='')
        return products;
   return products.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()));
}