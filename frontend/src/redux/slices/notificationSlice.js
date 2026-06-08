import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchNotifications = createAsyncThunk('notifications/fetchAll', async (_, { rejectWithValue }) => {
  try { const { data } = await api.get('/notifications'); return data; }
  catch (err) { return rejectWithValue(err.response?.data?.message); }
});

export const markRead    = createAsyncThunk('notifications/markRead', async (id) => {
  await api.put(`/notifications/${id}/read`); return id;
});

export const markAllRead = createAsyncThunk('notifications/markAllRead', async () => {
  await api.put('/notifications/read-all');
});

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: { list: [], unreadCount: 0, loading: false },
  reducers: {},
  extraReducers: b => {
    b.addCase(fetchNotifications.fulfilled, (s, a) => {
       s.list = a.payload.notifications;
       s.unreadCount = a.payload.unreadCount;
     })
     .addCase(markRead.fulfilled, (s, a) => {
       const n = s.list.find(n => n._id === a.payload);
       if (n && !n.isRead) { n.isRead = true; s.unreadCount = Math.max(0, s.unreadCount - 1); }
     })
     .addCase(markAllRead.fulfilled, s => {
       s.list.forEach(n => n.isRead = true);
       s.unreadCount = 0;
     });
  },
});

export default notificationSlice.reducer;
