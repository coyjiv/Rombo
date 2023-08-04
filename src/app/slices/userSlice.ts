import { createSlice } from "@reduxjs/toolkit";
import { login } from "../actions";
import { User, Error } from "@/types";

interface UserSlice {
  user: User[] | [];
  isLoggedIn: boolean;
  chatRooms: [];
  activeChatRoom: any;
  error: Error;
}

const initialState = {
  user: [],
  isLoggedIn: false,
  chatRooms: [],
  activeChatRoom: {},
  error: { error: "" },
} as UserSlice;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      Object.assign(state.user, action.payload);
      state.isLoggedIn = true;
    }),
      builder.addCase(login.rejected, (state, action) => {
        state.error.error = action.payload;
      });
  },
});
export const userReducer = userSlice.reducer;
