import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App.tsx';
import '@/index.css';
import '@/assets/styles/styles.scss';
import { OverlayProvider } from '@/providers/overLayProvider';
import { LoginStateProvider } from '@/providers/loginStateProvider';
import { Provider } from 'react-redux';
import store from '@/redux/store';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <>
      <Provider store={store}>
        <LoginStateProvider>
          <OverlayProvider>
            <App />    
          </OverlayProvider>
        </LoginStateProvider>
      </Provider>
    </>
  </React.StrictMode>,
);
