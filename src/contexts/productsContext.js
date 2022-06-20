import React, { useReducer } from "react";
import axios from "axios";

export const productContext = React.createContext();

// const API = "http://localhost:8002/data";
const API = "https://makers-deploy.herokuapp.com/data";
const INIT_STATE = {
  products: [],
  oneProduct: null,
  pages: 0,
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload.data.reverse(),
        pages: Math.ceil(action.payload.headers["x-total-count"] / 3),
      };
    case "GET_ONE_PRODUCT":
      return { ...state, oneProduct: action.payload };
    default:
      return state;
  }
}

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  async function createProduct(newProduct) {
    await axios.post(API, newProduct);
  }

  async function getProducts() {
    let response = await axios(`${API}${window.location.search}`);
    dispatch({
      type: "GET_PRODUCTS",
      payload: response,
    });
  }

  async function deleteProduct(id) {
    await axios.delete(`${API}/${id}`);
    getProducts();
  }

  async function getOneProduct(id) {
    let response = await axios(`${API}/${id}`);
    dispatch({
      type: "GET_ONE_PRODUCT",
      payload: response.data,
    });
  }

  async function updatedProduct(id, editedProduct) {
    await axios.patch(`${API}/${id}`, editedProduct);
    getOneProduct();
  }

  return (
    <productContext.Provider
      value={{
        products: state.products,
        oneProduct: state.oneProduct,
        editedProduct: state.editedProduct,
        pages: state.pages,
        createProduct,
        getProducts,
        deleteProduct,
        getOneProduct,
        updatedProduct,
      }}>
      {children}
    </productContext.Provider>
  );
};

export default ProductContextProvider;
