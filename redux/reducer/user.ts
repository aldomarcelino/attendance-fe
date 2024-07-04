import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
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

// export const login = (data: any) => async (dispatch: any) => {
//   try {
//     const response = await axios.post(
//       "http://localhost:3000/user/signin",
//       data
//     );

//     console.log(response, "<<<response");
//     console.log(dispatch, "<<dispatch");

//     // dispatch(setUserLogin(true));
//     // dispatch(setUser(res));
//     // storeData(res);
//   } catch (error) {
//     console.log(error);
//   }
// };

export default userSlice.reducer;
