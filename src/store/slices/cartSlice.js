/**
 * Shopping Cart Redux Slice (store/slices/cartSlice.js)
 *
 * Manages the user's shopping cart (client-side, not from API):
 * - Products added to cart
 * - Item quantities
 * - Total price calculation
 * - Total quantity tracking
 *
 * Actions:
 * - addToCart: Add product or increment quantity
 * - removeFromCart: Remove entire item from cart
 * - updateQuantity: Change item quantity
 * - clearCart: Empty the entire cart
 *
 * State:
 * - items: Array of cart items with quantities
 * - totalQuantity: Total number of items
 * - totalPrice: Sum of all item prices
 *
 * Usage:
 * dispatch(addToCart(product)) - Add product to cart
 * dispatch(removeFromCart({ id: 5 })) - Remove product
 * dispatch(updateQuantity({ id: 5, quantity: 3 })) - Change quantity
 */

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Array of cart items
    totalQuantity: 0, // Total number of items
    totalPrice: 0, // Total cart value
  },
  reducers: {
    /**
     * Add product to cart or increment its quantity
     * payload: { id, title, price, image, ... }
     */
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        // Product already in cart - increment quantity
        existingItem.quantity += 1;
      } else {
        // New product - add to cart with quantity 1
        state.items.push({ ...action.payload, quantity: 1 });
      }

      // Update totals
      state.totalQuantity += 1;
      state.totalPrice += action.payload.price;
    },

    /**
     * Remove entire product from cart
     * payload: { id }
     */
    removeFromCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        // Update totals by removing item's total cost and quantity
        state.totalPrice -= item.price * item.quantity;
        state.totalQuantity -= item.quantity;
        state.items.splice(itemIndex, 1);
      }
    },

    /**
     * Update quantity for a cart item
     * payload: { id, quantity }
     */
    updateQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);

      if (item) {
        // Calculate price difference for the quantity change
        const priceDiff = action.payload.quantity - item.quantity;
        state.totalPrice += priceDiff * item.price;
        state.totalQuantity += priceDiff;
        item.quantity = action.payload.quantity;
      }
    },

    /**
     * Clear all items from cart
     */
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
