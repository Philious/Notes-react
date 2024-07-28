import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from '@/pages/Router';
import '@/assets/styles/styles.scss';
import { OverlayProvider } from '@/providers/overLayProvider';
import { Provider } from 'react-redux';
import store from '@/redux/store';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <>
      <Provider store={store}>
          <OverlayProvider>
            <Router />    
          </OverlayProvider>
      </Provider>
    </>
  </React.StrictMode>,
);
