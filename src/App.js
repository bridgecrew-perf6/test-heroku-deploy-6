import React from "react";

import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Routing from "./Routing";

import "./App.css";
import ProductContextProvider from "./contexts/productsContext";
import AuthContextProvider from "./contexts/authContext";
import CartContextProvider from "./contexts/cartContext";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <AuthContextProvider>
      <ProductContextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <Header />
            <Routing />
            <Footer />
          </BrowserRouter>
        </CartContextProvider>
      </ProductContextProvider>
    </AuthContextProvider>
  );
};

export default App;
