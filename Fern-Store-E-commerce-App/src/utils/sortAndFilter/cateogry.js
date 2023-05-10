const getUnionOfProducts = (...arr) => {
  return (
    arr.reduce((prev, current) =>
      { 
        return prev.concat(
          current.filter(item =>
            !prev.some(p => p.id === item.id))
        ); 
      },
      []
    )
  );
}

export const getCateogrisedProducts = (data, cateogries) => {
  let filterData = [];
  let flag=false;
  for(const cateogry in cateogries){
    if(cateogries[cateogry]){
      flag=true;
      filterData = getUnionOfProducts(
        filterData,
        data.filter(item => item['categoryName'] === cateogry)
      );
    }
  }
  return flag ? filterData : data;
};
  