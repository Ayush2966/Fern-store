import { createContext, useContext, useState } from "react";

const OrderContext = createContext();
const useOrderSummary = () => useContext(OrderContext);

const OrderSummaryProvider = ({ children }) => {
  const [order, setOrder] = useState({
  });
  return (
  <OrderContext.Provider value={{ order, setOrder }}>
      {children}
  </OrderContext.Provider>
  )
}

export {OrderSummaryProvider, useOrderSummary}