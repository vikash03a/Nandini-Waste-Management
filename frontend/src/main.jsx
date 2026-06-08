import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { store } from './redux/store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#0f4e0f',
              color: '#fff',
              borderRadius: '12px',
              fontFamily: '"DM Sans", sans-serif',
            },
            success: { iconTheme: { primary: '#4db84d', secondary: '#fff' } },
            error:   { style: { background: '#7f1d1d' } },
          }}
        />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
