import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    homeScroll: 0,
  },
  reducers: {
    setHomeScroll: (state, action) => {
      state.homeScroll = action.payload;
    },
    clearHomeScroll: (state) => {
      state.homeScroll = 0;
    },
  },
});

export const { setHomeScroll, clearHomeScroll } = uiSlice.actions;
export default uiSlice.reducer;