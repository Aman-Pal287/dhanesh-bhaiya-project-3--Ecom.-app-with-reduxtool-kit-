import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUser: (state, action) => {
      //^here we cannot call api
      state.users = action.payload;
    },
  },
});

export const { loadUser } = userSlice.actions;
export default userSlice.reducer;
