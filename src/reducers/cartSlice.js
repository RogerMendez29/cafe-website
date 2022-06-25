import { createSlice, current } from "@reduxjs/toolkit";
import { fetchCart } from "../utils/fetchLocalData";

const cartInfo = fetchCart();

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    showCart: false,
    cartItems: cartInfo,
  },
  reducers: {
    addItem: (state, action) => {
      state.cartItems.push(action.payload);
    },

    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    setCartShow: (state, action) => {
      state.showCart = action.payload;
    },
    addItemQty: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      state.cartItems[index].qty++;
    },
    subtractItemQty: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      if (state.cartItems[index].qty === 1) {
        state.cartItems.splice(index, 1);
      } else {
        state.cartItems[index].qty--;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCartItems,
  setCartShow,
  addItem,
  addItemQty,
  subtractItemQty,
} = cartSlice.actions;

export default cartSlice.reducer;
