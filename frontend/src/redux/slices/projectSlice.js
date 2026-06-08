import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import toast from 'react-hot-toast';

export const fetchProjects = createAsyncThunk('projects/fetchAll', async (params, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/projects', { params });
    return data;
  } catch (err) { return rejectWithValue(err.response?.data?.message); }
});

export const fetchProject = createAsyncThunk('projects/fetchOne', async (id, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`/projects/${id}`);
    return data.project;
  } catch (err) { return rejectWithValue(err.response?.data?.message); }
});

export const createProject = createAsyncThunk('projects/create', async (projectData, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/projects', projectData);
    toast.success('Project created!');
    return data.project;
  } catch (err) { toast.error(err.response?.data?.message); return rejectWithValue(err.response?.data?.message); }
});

export const updateProject = createAsyncThunk('projects/update', async ({ id, ...rest }, { rejectWithValue }) => {
  try {
    const { data } = await api.put(`/projects/${id}`, rest);
    toast.success('Project updated!');
    return data.project;
  } catch (err) { return rejectWithValue(err.response?.data?.message); }
});

export const fetchProjectStats = createAsyncThunk('projects/stats', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/projects/stats');
    return data.stats;
  } catch (err) { return rejectWithValue(err.response?.data?.message); }
});

const projectSlice = createSlice({
  name: 'projects',
  initialState: { list: [], current: null, stats: null, loading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProjects.pending,   s => { s.loading = true; })
      .addCase(fetchProjects.fulfilled, (s, a) => { s.loading = false; s.list = a.payload.projects; })
      .addCase(fetchProjects.rejected,  (s, a) => { s.loading = false; s.error = a.payload; })
      .addCase(fetchProject.fulfilled,  (s, a) => { s.current = a.payload; })
      .addCase(createProject.fulfilled, (s, a) => { s.list.unshift(a.payload); })
      .addCase(updateProject.fulfilled, (s, a) => {
        const i = s.list.findIndex(p => p._id === a.payload._id);
        if (i !== -1) s.list[i] = a.payload;
        if (s.current?._id === a.payload._id) s.current = a.payload;
      })
      .addCase(fetchProjectStats.fulfilled, (s, a) => { s.stats = a.payload; });
  },
});

export default projectSlice.reducer;
