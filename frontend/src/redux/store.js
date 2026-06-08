import { configureStore } from '@reduxjs/toolkit';
import authReducer         from './slices/authSlice';
import projectReducer      from './slices/projectSlice';
import reportReducer       from './slices/reportSlice';
import attendanceReducer   from './slices/attendanceSlice';
import notificationReducer from './slices/notificationSlice';
import municipalityReducer from './slices/municipalitySlice';
import complaintReducer    from './slices/complaintSlice';
import userReducer         from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth:         authReducer,
    projects:     projectReducer,
    reports:      reportReducer,
    attendance:   attendanceReducer,
    notifications:notificationReducer,
    municipalities:municipalityReducer,
    complaints:   complaintReducer,
    users:        userReducer,
  },
});
