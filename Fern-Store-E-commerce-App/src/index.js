import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { makeServer } from "./server";
import { ProductContextProvider, AuthContextProvider, SliderProvider, OrderSummaryProvider } from "./contexts/index";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <SliderProvider>
          <ProductContextProvider>
            <OrderSummaryProvider>
              <App />
            </OrderSummaryProvider>
          </ProductContextProvider>
        </SliderProvider>
      </AuthContextProvider>
    </Router>

  </React.StrictMode>,
  document.getElementById("root")
);
