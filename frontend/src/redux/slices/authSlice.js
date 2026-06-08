import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import toast from 'react-hot-toast';

// Load token from localStorage
const token = localStorage.getItem('nwm_token');
const user  = JSON.parse(localStorage.getItem('nwm_user') || 'null');

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/login', credentials);
    localStorage.setItem('nwm_token', data.token);
    localStorage.setItem('nwm_user',  JSON.stringify(data.user));
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

export const getMe = createAsyncThunk('auth/getMe', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/auth/me');
    return data.user;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const updateProfile = createAsyncThunk('auth/updateProfile', async (profileData, { rejectWithValue }) => {
  try {
    const { data } = await api.put('/auth/update-profile', profileData);
    localStorage.setItem('nwm_user', JSON.stringify(data.user));
    return data.user;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const changePassword = createAsyncThunk('auth/changePassword', async (passwords, { rejectWithValue }) => {
  try {
    const { data } = await api.put('/auth/change-password', passwords);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user:      user  || null,
    token:     token || null,
    loading:   false,
    error:     null,
    isAuthenticated: !!token,
  },
  reducers: {
    logout(state) {
      state.user            = null;
      state.token           = null;
      state.isAuthenticated = false;
      localStorage.removeItem('nwm_token');
      localStorage.removeItem('nwm_user');
    },
    clearError(state) { state.error = null; },
  },
  extraReducers: builder => {
    builder
      // login
      .addCase(login.pending,  s => { s.loading = true; s.error = null; })
      .addCase(login.fulfilled, (s, a) => {
        s.loading = false; s.user = a.payload.user;
        s.token = a.payload.token; s.isAuthenticated = true;
        toast.success(`Welcome back, ${a.payload.user.name}!`);
      })
      .addCase(login.rejected, (s, a) => {
        s.loading = false; s.error = a.payload;
        toast.error(a.payload);
      })
      // getMe
      .addCase(getMe.fulfilled, (s, a) => { s.user = a.payload; })
      // updateProfile
      .addCase(updateProfile.fulfilled, (s, a) => {
        s.user = a.payload;
        toast.success('Profile updated!');
      })
      // changePassword
      .addCase(changePassword.fulfilled, () => { toast.success('Password changed!'); })
      .addCase(changePassword.rejected, (s, a) => { toast.error(a.payload); });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
