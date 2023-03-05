import { createSlice } from "@reduxjs/toolkit";
import { getAllFoodItems } from "../../utils/firebaseFunctions";
import { fetchUser } from "../../utils/fetchLocalData";

const userSlice = createSlice({
  name: "user",
  initialState: { userDetails: fetchUser() },

  reducers: {
    setUser(state, action) {
      if (action.payload) {
        state.userDetails = action.payload;
      } else {
        state.userDetails = null;
      }
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
