import React, { createContext, useState } from 'react';
import axios from 'axios';

export const cartContext = createContext();

export default function CartContextProvider(props) {
  const [cartNumber, setCartNumber] = useState(0);


let headers = {
  token: localStorage.getItem('userToken')
}  // Add product to cart
  function addProductToCart(productId) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      { productId },
      { headers }
    )
      .then((response) => {
        setCartNumber(response.data.numOfCartItems);
        return response;
      })
      .catch((error) => {
        console.error('Error adding product to cart:', error);
        return error;
      });
  }

  // Get products in cart
  function getProductToCart() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      { headers }
    )
      .then((response) => {
        setCartNumber(response.data.numOfCartItems);
        return response;
      })
      .catch((error) => {
        console.error('Error fetching cart:', error);
        return error;
      });
  }

  // Delete product from cart
  function deleteProductFromCart(productId) {
    return axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { headers  }
    )
      .then((response) => {
        setCartNumber(response.data.numOfCartItems);
        return response;
      })
      .catch((error) => {
        console.error('Error deleting product from cart:', error);
        return error;
      });
  }
function updateProductQuantity(productId, newCount) {
  return axios.put(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    { count: newCount },
    { headers :headers }
  )
    .then((response) => {
      setCartNumber(response.data.numOfCartItems);
      return response;
    })
    .catch((error) => {
      console.error('Error updating product quantity:', error);
      return error;
    });
}


  return (
    <cartContext.Provider value={{ addProductToCart, getProductToCart, deleteProductFromCart, cartNumber,updateProductQuantity }}>
      {props.children}
    </cartContext.Provider>
  );
}
