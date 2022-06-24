import { createSlice } from "@reduxjs/toolkit";

export const foodSlice = createSlice({
  name: "food",
  initialState: { foodItems: [] },
  reducers: {
    setFoodItems: (state, action) => {
      state.foodItems = state.foodItems.concat(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFoodItems } = foodSlice.actions;

export default foodSlice.reducer;
