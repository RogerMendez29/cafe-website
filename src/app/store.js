import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reducers/counterSlice";
import userReducer from "./reducers/userSlice";
import foodItemsReducer from "./reducers/foodItemsSlice";
import cartReducer from "./reducers/cartSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    foodItems: foodItemsReducer,
    cart: cartReducer,
  },
});
