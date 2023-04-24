import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: { foodItems: [] },

  reducers: {
    retrieveAllFoodItems(state, action) {
      const allFoodItems = action.payload;
      for (let index = 0; index < allFoodItems.length; index++) {
        const item = allFoodItems[index];
        
        state.foodItems.push(item);
      }
    },
  },
});

export const itemsActions = itemsSlice.actions;
export default itemsSlice;
