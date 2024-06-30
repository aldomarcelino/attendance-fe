import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  isLogin: boolean;
}

const initialState: CounterState = {
  isLogin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLogin: (state) => {
      state.isLogin = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserLogin } = userSlice.actions;

export default userSlice.reducer;
