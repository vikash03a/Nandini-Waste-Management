import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import toast from 'react-hot-toast';

export const fetchComplaints = createAsyncThunk('complaints/fetchAll', async (params, { rejectWithValue }) => {
  try { const { data } = await api.get('/complaints', { params }); return data; }
  catch (err) { return rejectWithValue(err.response?.data?.message); }
});

export const createComplaint = createAsyncThunk('complaints/create', async (cData, { rejectWithValue }) => {
  try { const { data } = await api.post('/complaints', cData); toast.success('Complaint raised!'); return data.complaint; }
  catch (err) { toast.error(err.response?.data?.message); return rejectWithValue(err.response?.data?.message); }
});

export const resolveComplaint = createAsyncThunk('complaints/resolve', async ({ id, resolution }, { rejectWithValue }) => {
  try { const { data } = await api.put(`/complaints/${id}/resolve`, { resolution }); toast.success('Resolved!'); return data.complaint; }
  catch (err) { return rejectWithValue(err.response?.data?.message); }
});

const complaintSlice = createSlice({
  name: 'complaints',
  initialState: { list: [], loading: false },
  reducers: {},
  extraReducers: b => {
    b.addCase(fetchComplaints.pending,    s => { s.loading = true; })
     .addCase(fetchComplaints.fulfilled,  (s, a) => { s.loading = false; s.list = a.payload.complaints; })
     .addCase(createComplaint.fulfilled,  (s, a) => { s.list.unshift(a.payload); })
     .addCase(resolveComplaint.fulfilled, (s, a) => {
       const i = s.list.findIndex(c => c._id === a.payload._id);
       if (i !== -1) s.list[i] = a.payload;
     });
  },
});

export default complaintSlice.reducer;
