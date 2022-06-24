import { createSlice } from "@reduxjs/toolkit";

export const foodItemsSlice = createSlice({
  name: "foodItems",
  initialState: [],
  reducers: {
    setFoodItems: (state, action) => {
      state = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFoodItems } = foodItemsSlice.actions;

export default foodItemsSlice.reducer;
