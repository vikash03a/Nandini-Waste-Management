import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import toast from 'react-hot-toast';

export const fetchUsers = createAsyncThunk('users/fetchAll', async (params, { rejectWithValue }) => {
  try { const { data } = await api.get('/users', { params }); return data; }
  catch (err) { return rejectWithValue(err.response?.data?.message); }
});

export const createUser = createAsyncThunk('users/create', async (userData, { rejectWithValue }) => {
  try { const { data } = await api.post('/auth/register', userData); toast.success('Employee added!'); return data.user; }
  catch (err) { toast.error(err.response?.data?.message); return rejectWithValue(err.response?.data?.message); }
});

export const updateUser = createAsyncThunk('users/update', async ({ id, ...rest }, { rejectWithValue }) => {
  try { const { data } = await api.put(`/users/${id}`, rest); toast.success('Updated!'); return data.user; }
  catch (err) { return rejectWithValue(err.response?.data?.message); }
});

export const fetchUserStats = createAsyncThunk('users/stats', async (_, { rejectWithValue }) => {
  try { const { data } = await api.get('/users/stats'); return data.stats; }
  catch (err) { return rejectWithValue(err.response?.data?.message); }
});

const userSlice = createSlice({
  name: 'users',
  initialState: { list: [], stats: null, loading: false },
  reducers: {},
  extraReducers: b => {
    b.addCase(fetchUsers.pending,    s => { s.loading = true; })
     .addCase(fetchUsers.fulfilled,  (s, a) => { s.loading = false; s.list = a.payload.users; })
     .addCase(createUser.fulfilled,  (s, a) => { s.list.unshift(a.payload); })
     .addCase(updateUser.fulfilled,  (s, a) => {
       const i = s.list.findIndex(u => u._id === a.payload._id);
       if (i !== -1) s.list[i] = a.payload;
     })
     .addCase(fetchUserStats.fulfilled, (s, a) => { s.stats = a.payload; });
  },
});

export default userSlice.reducer;
