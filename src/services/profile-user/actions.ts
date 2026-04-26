import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const registerUserThunk = createAsyncThunk<
  TUser,
  TRegisterData,
  { rejectValue: string }
>('profileUser/registerUser', async (form, thunkApi) => {
  try {
    const res = await registerUserApi(form);

    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);

    return res.user;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Ошибка регистрации';
    return thunkApi.rejectWithValue(message);
  }
});

export const loginUserThunk = createAsyncThunk<
  TUser,
  TLoginData,
  { rejectValue: string }
>('profileUser/loginUser', async (form, thunkApi) => {
  try {
    const res = await loginUserApi(form);

    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);

    return res.user;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Ошибка входа';
    return thunkApi.rejectWithValue(message);
  }
});

export const logoutUserThunk = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>('profileUser/logoutUser', async (_, thunkApi) => {
  try {
    await logoutApi();
    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Ошибка выхода';
    return thunkApi.rejectWithValue(message);
  }
});

export const getUserThunk = createAsyncThunk<
  TUser,
  void,
  { rejectValue: string }
>('profileUser/getUser', async (_, thunkApi) => {
  try {
    const res = await getUserApi();
    return res.user;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Ошибка загрузки профиля';
    return thunkApi.rejectWithValue(message);
  }
});

export const updateUserThunk = createAsyncThunk<
  TUser,
  Partial<TRegisterData>,
  { rejectValue: string }
>('profileUser/updateUser', async (form, thunkApi) => {
  try {
    const res = await updateUserApi(form);
    return res.user;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Ошибка обновления профиля';
    return thunkApi.rejectWithValue(message);
  }
});
