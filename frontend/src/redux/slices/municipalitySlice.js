import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import toast from 'react-hot-toast';

export const fetchMunicipalities = createAsyncThunk('municipalities/fetchAll', async (params, { rejectWithValue }) => {
  try { const { data } = await api.get('/municipalities', { params }); return data; }
  catch (err) { return rejectWithValue(err.response?.data?.message); }
});

export const createMunicipality = createAsyncThunk('municipalities/create', async (mData, { rejectWithValue }) => {
  try { const { data } = await api.post('/municipalities', mData); toast.success('Municipality added!'); return data.municipality; }
  catch (err) { toast.error(err.response?.data?.message); return rejectWithValue(err.response?.data?.message); }
});

export const updateMunicipality = createAsyncThunk('municipalities/update', async ({ id, ...rest }, { rejectWithValue }) => {
  try { const { data } = await api.put(`/municipalities/${id}`, rest); toast.success('Updated!'); return data.municipality; }
  catch (err) { return rejectWithValue(err.response?.data?.message); }
});

const municipalitySlice = createSlice({
  name: 'municipalities',
  initialState: { list: [], loading: false },
  reducers: {},
  extraReducers: b => {
    b.addCase(fetchMunicipalities.pending,   s => { s.loading = true; })
     .addCase(fetchMunicipalities.fulfilled, (s, a) => { s.loading = false; s.list = a.payload.municipalities; })
     .addCase(createMunicipality.fulfilled,  (s, a) => { s.list.unshift(a.payload); })
     .addCase(updateMunicipality.fulfilled,  (s, a) => {
       const i = s.list.findIndex(m => m._id === a.payload._id);
       if (i !== -1) s.list[i] = a.payload;
     });
  },
});

export default municipalitySlice.reducer;
