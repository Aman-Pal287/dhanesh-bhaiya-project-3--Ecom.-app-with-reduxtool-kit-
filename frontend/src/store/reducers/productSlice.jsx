import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    loadProduct: (state, action) => {
      //^here we cannot call api
      state.products = action.payload;
    },
    loadLazyProduct: (state, action) => {
      //^here we cannot call api
      state.products = [...state.products, ...action.payload];
    },
  },
});

export default productSlice.reducer;
export const { loadProduct, loadLazyProduct } = productSlice.actions;
