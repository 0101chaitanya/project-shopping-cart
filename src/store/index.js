

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import cartsReducer from "./slices/cartsSlice";
import categoriesReducer from "./slices/categoriesSlice";
import productReducer from "./slices/productSlice";
import usersReducer from "./slices/usersSlice";


const store = configureStore({
  reducer: {
    products: productReducer, 
    cart: cartReducer, 
    auth: authReducer, 
    users: usersReducer, 
    categories: categoriesReducer, 
    carts: cartsReducer, 
  },
});

export default store;




