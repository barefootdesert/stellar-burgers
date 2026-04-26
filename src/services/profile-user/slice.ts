import { TUser } from '@utils-types';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  getUserThunk,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  updateUserThunk
} from './actions';

type UserProfileType = {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
};

export const initialState: UserProfileType = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null
};

export const userProfileSlice = createSlice({
  name: 'profileUser',
  initialState,
  reducers: {},
  selectors: {
    selectUserProfile: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
        state.error = null;
        state.isAuthChecked = true;
      })
      .addMatcher(
        isAnyOf(
          registerUserThunk.pending,
          loginUserThunk.pending,
          logoutUserThunk.pending,
          getUserThunk.pending,
          updateUserThunk.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          registerUserThunk.rejected,
          loginUserThunk.rejected,
          logoutUserThunk.rejected,
          getUserThunk.rejected,
          updateUserThunk.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.isAuthChecked = true;
          state.error =
            action.payload ?? action.error.message ?? 'Unknown error';
        }
      )
      .addMatcher(
        isAnyOf(
          registerUserThunk.fulfilled,
          loginUserThunk.fulfilled,
          getUserThunk.fulfilled,
          updateUserThunk.fulfilled
        ),
        (state, action) => {
          state.isLoading = false;
          state.isAuthChecked = true;
          state.user = action.payload;
        }
      );
  }
});

export const {
  selectUserProfile,
  selectIsAuthChecked,
  selectIsLoading,
  selectError
} = userProfileSlice.selectors;
