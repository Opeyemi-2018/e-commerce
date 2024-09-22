import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  quantity: 1,
};

let countSlice = createSlice({
  name: 'quantity',
  initialState,

  reducers: {
    decrement: (state) => {
      if (state.quantity === 1) {
        state.quantity = 1;  // Ensures quantity does not go below 1
      } else {
        state.quantity -= 1;  // Correctly decrements quantity by 1
      }
    },

    increment: (state) => {
      state.quantity += 1;  // Correctly increments quantity by 1
    },
  },
});

export let { decrement, increment } = countSlice.actions;
export default countSlice.reducer;
