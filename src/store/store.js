import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./shopping-cart/cartSlice";
import cartUiSlice from "./shopping-cart/cartUiSlice";
import itemsSlice from "./items/itemsSlice";
import userSlice from "./user/userSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    cartUi: cartUiSlice.reducer,
    items: itemsSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
