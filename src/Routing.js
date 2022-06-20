import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AddProductForm from "./Components/AddProductForm/AddProductForm";
import Cart from "./Components/Cart/Cart";
import EditProductForm from "./Components/EditProductForm/EditProductForm";
import LoginForm from "./Components/LoginForm/LoginForm";
import NotFound from "./Components/NotFound/NotFound";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import ProductsLists from "./Components/ProductsList/ProductsLists";
import SignUpForm from "./Components/SignUpFrom/SignUpForm";
import { authContext } from "./contexts/authContext";

const Routing = () => {
  const { admin } = useContext(authContext);
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route
          path="/add-product"
          element={admin ? <AddProductForm /> : <Navigate replace to="*" />}
        />
        <Route path="/products" element={<ProductsLists />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route
          path="/edit/:id"
          element={admin ? <EditProductForm /> : <Navigate replace to="*" />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Routing;
