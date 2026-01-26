import { createSlice } from "@reduxjs/toolkit";

let cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], 
    totalQuantity: 0, 
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      let existingItemIndex = -1;
      
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].id === action.payload.id) {
          existingItemIndex = i;
          break;
        }
      }

      if (existingItemIndex >= 0) {
        
        state.items[existingItemIndex].quantity = state.items[existingItemIndex].quantity + 1;
      } else {
        
        let newItem = {};
        newItem.id = action.payload.id;
        newItem.title = action.payload.title;
        newItem.price = action.payload.price;
        newItem.image = action.payload.image;
        newItem.quantity = 1;
        state.items.push(newItem);
      }

      state.totalQuantity = state.totalQuantity + 1;
      state.totalPrice = state.totalPrice + action.payload.price;
    },

    removeFromCart: (state, action) => {
      let itemIdx = -1;
      
      for (let j = 0; j < state.items.length; j++) {
        if (state.items[j].id === action.payload.id) {
          itemIdx = j;
          break;
        }
      }

      if (itemIdx !== -1) {
        let itemToRemove = state.items[itemIdx];
        state.totalPrice = state.totalPrice - (itemToRemove.price * itemToRemove.quantity);
        state.totalQuantity = state.totalQuantity - itemToRemove.quantity;
        state.items.splice(itemIdx, 1);
      }
      
    },

    updateQuantity: (state, action) => {
      let foundItem = null;
      
      for (let k = 0; k < state.items.length; k++) {
        if (state.items[k].id === action.payload.id) {
          foundItem = state.items[k];
          break;
        }
      }

      if (foundItem) {
        let oldQty = foundItem.quantity;
        let newQty = action.payload.quantity;
        let priceDiff = (newQty - oldQty) * foundItem.price;
        state.totalPrice = state.totalPrice + priceDiff;
        state.totalQuantity = state.totalQuantity + (newQty - oldQty);
        foundItem.quantity = newQty;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;



