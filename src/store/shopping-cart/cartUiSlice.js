import { createSlice } from "@reduxjs/toolkit";

const cartUiSlice = createSlice({
  name: "cartUi",
  initialState: { cartIsVisible: false },

  reducers: {
    toggle(state, action) {
      state.cartIsVisible = action.payload;
    },
  },
});

export const cartUiActions = cartUiSlice.actions;
export default cartUiSlice;
