// reportSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import toast from 'react-hot-toast';

export const fetchReports = createAsyncThunk('reports/fetchAll', async (params, { rejectWithValue }) => {
  try { const { data } = await api.get('/daily-reports', { params }); return data; }
  catch (err) { return rejectWithValue(err.response?.data?.message); }
});

export const submitReport = createAsyncThunk('reports/submit', async (reportData, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/daily-reports', reportData);
    toast.success('Daily report submitted!');
    return data.report;
  } catch (err) { toast.error(err.response?.data?.message); return rejectWithValue(err.response?.data?.message); }
});

export const reviewReport = createAsyncThunk('reports/review', async ({ id, ...rest }, { rejectWithValue }) => {
  try {
    const { data } = await api.put(`/daily-reports/${id}/review`, rest);
    toast.success(`Report ${rest.status}!`);
    return data.report;
  } catch (err) { return rejectWithValue(err.response?.data?.message); }
});

export const fetchReportStats = createAsyncThunk('reports/stats', async (_, { rejectWithValue }) => {
  try { const { data } = await api.get('/daily-reports/stats'); return data.stats; }
  catch (err) { return rejectWithValue(err.response?.data?.message); }
});

const reportSlice = createSlice({
  name: 'reports',
  initialState: { list: [], stats: null, loading: false, error: null },
  reducers: {},
  extraReducers: b => {
    b.addCase(fetchReports.pending,   s => { s.loading = true; })
     .addCase(fetchReports.fulfilled, (s, a) => { s.loading = false; s.list = a.payload.reports; })
     .addCase(fetchReports.rejected,  (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(submitReport.fulfilled, (s, a) => { s.list.unshift(a.payload); })
     .addCase(reviewReport.fulfilled, (s, a) => {
       const i = s.list.findIndex(r => r._id === a.payload._id);
       if (i !== -1) s.list[i] = a.payload;
     })
     .addCase(fetchReportStats.fulfilled, (s, a) => { s.stats = a.payload; });
  },
});

export default reportSlice.reducer;
