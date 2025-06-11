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
    removeuser: (state, action) => {
      state.users = null;
    },
  },
});

export const { loadUser, removeuser } = userSlice.actions;
export default userSlice.reducer;
