import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import toast from 'react-hot-toast';

export const checkIn  = createAsyncThunk('attendance/checkIn', async (data, { rejectWithValue }) => {
  try { const res = await api.post('/attendance/check-in', data); toast.success('Checked in!'); return res.data.attendance; }
  catch (err) { toast.error(err.response?.data?.message); return rejectWithValue(err.response?.data?.message); }
});

export const checkOut = createAsyncThunk('attendance/checkOut', async (data, { rejectWithValue }) => {
  try { const res = await api.put('/attendance/check-out', data); toast.success('Checked out!'); return res.data.attendance; }
  catch (err) { toast.error(err.response?.data?.message); return rejectWithValue(err.response?.data?.message); }
});

export const fetchTodayStatus = createAsyncThunk('attendance/today', async (_, { rejectWithValue }) => {
  try { const { data } = await api.get('/attendance/today'); return data.attendance; }
  catch (err) { return rejectWithValue(err.response?.data?.message); }
});

export const fetchAttendance = createAsyncThunk('attendance/fetchAll', async (params, { rejectWithValue }) => {
  try { const { data } = await api.get('/attendance', { params }); return data; }
  catch (err) { return rejectWithValue(err.response?.data?.message); }
});

export const fetchAttendanceStats = createAsyncThunk('attendance/stats', async (_, { rejectWithValue }) => {
  try { const { data } = await api.get('/attendance/stats'); return data.stats; }
  catch (err) { return rejectWithValue(err.response?.data?.message); }
});

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: { today: null, list: [], stats: null, loading: false },
  reducers: {},
  extraReducers: b => {
    b.addCase(fetchTodayStatus.fulfilled, (s, a) => { s.today = a.payload; })
     .addCase(checkIn.fulfilled,          (s, a) => { s.today = a.payload; })
     .addCase(checkOut.fulfilled,         (s, a) => { s.today = a.payload; })
     .addCase(fetchAttendance.pending,    s => { s.loading = true; })
     .addCase(fetchAttendance.fulfilled,  (s, a) => { s.loading = false; s.list = a.payload.records; })
     .addCase(fetchAttendanceStats.fulfilled, (s, a) => { s.stats = a.payload; });
  },
});

export default attendanceSlice.reducer;
