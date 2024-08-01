import React from 'react';
import ReactDOM from 'react-dom/client';
import Pages from '@/pages/Router';
import '@/assets/styles/styles.scss';
import { OverlayProvider } from '@/providers/overLayProvider';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { UserStateProvider } from './providers/userStateProvider';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <>
      <BrowserRouter>
        <Provider store={store}>
          <UserStateProvider>
            <OverlayProvider>
              <Pages />    
            </OverlayProvider>
          </UserStateProvider>
        </Provider>
      </BrowserRouter>
    </>
  </React.StrictMode>,
);
