export const getSortedData = (data, sortBy) => {
    if (sortBy === "lowtoHigh")
      return [...data].sort((a, b) => a.discountedPrice - b.discountedPrice);
    if (sortBy === "hightoLow")
      return [...data].sort((a, b) => b.discountedPrice - a.discountedPrice);
    return data;
  };
  