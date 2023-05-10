export const getDatainStarRatingRange = (data, star) => {
    if(star==='')
        return data;
    return data.filter(product => product.rating >= Number(star));
};