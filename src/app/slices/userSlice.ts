import { createSlice } from "@reduxjs/toolkit";
// import { login } from "../actions";
import { User, UserProfile } from "@/types";

interface UserSlice {
  profile: UserProfile,
  user: User[] | [];
  activeChatRoom: any;
//   error: Error;
}

const initialState = {
    profile: {},
    user: {},
    activeChatRoom: {},
    error: { error: "" },
} as unknown as UserSlice;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateProfile(state, action) {
        state.profile = action.payload;
    },
  },
});

export const { updateProfile } = userSlice.actions;
export const userReducer = userSlice.reducer;
