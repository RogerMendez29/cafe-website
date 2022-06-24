import { createSlice } from "@reduxjs/toolkit";
import { fetchCart } from "../../utils/fetchLocalData";

const cartInfo = fetchCart();

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    showCart: false,
    cartItems: cartInfo,
  },
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    setCartShow: (state, action) => {
      state.showCart = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCartItems, setCartShow } = cartSlice.actions;

export default cartSlice.reducer;
