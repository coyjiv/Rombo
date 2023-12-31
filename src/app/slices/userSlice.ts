import { createSlice } from "@reduxjs/toolkit";
import { User, UserProfile } from "@/types";
import { fetchCurrentUser, fetchCurrentProfile, updateProfile } from "../actions/user";

interface UserSlice {
  profile: UserProfile,
  user: User;
  activeChatRoom: any;
  error: any;
  isLoading: boolean;
}

const initialState = {
    profile: {},
    user: {},
    activeChatRoom: {},
    error: { error: "" },
    isLoading: true,
} as unknown as UserSlice;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateAvatar: (state, action) => {
      state.user.avatar = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = { error: "" };
      state.isLoading = false;
    }
    );
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchCurrentProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.error = { error: "" };
      state.isLoading = false;
    }
    );
    builder.addCase(fetchCurrentProfile.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
    );
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.profile.bio = action.payload.bio;
      state.user.bio = action.payload.bio;
      state.profile.firstName = action.payload.fullName.split(" ")[0];
      state.profile.lastName = action.payload.fullName.split(" ")[1];
      state.error = { error: "" };
    });
  }
});

export const { updateAvatar } = userSlice.actions;

export const userReducer = userSlice.reducer;
