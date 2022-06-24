import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../../utils/fetchLocalData";

const userInfo = fetchUser();

export const userSlice = createSlice({
  name: "user",
  initialState: userInfo,
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
