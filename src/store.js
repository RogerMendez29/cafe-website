import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import foodReducer from "./reducers/foodSlice";
import cartReducer from "./reducers/cartSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    food: foodReducer,
    cart: cartReducer,
  },
});
