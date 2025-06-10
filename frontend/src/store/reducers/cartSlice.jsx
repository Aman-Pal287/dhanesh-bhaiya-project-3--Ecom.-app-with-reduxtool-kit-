import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadCart: (state, action) => {
      //^here we cannot call api
      state.carts = action.payload;
    },
  },
});

export default cartSlice.reducer;
export const { loadCart } = cartSlice.actions;
