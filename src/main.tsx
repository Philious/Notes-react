import React from 'react';
import ReactDOM from 'react-dom/client';
import Pages from '@/pages/Router';
import '@/assets/styles/styles.scss';
import { OverlayProvider } from '@/providers/overLayProvider';
import { UserStateProvider } from './providers/userStateProvider';
import { BrowserRouter } from 'react-router-dom';
import { NotesProvider } from './providers/notesProvider';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <>
      <BrowserRouter>
        <UserStateProvider>
          <NotesProvider>
            <OverlayProvider>
              <Pages />    
            </OverlayProvider>
          </NotesProvider>
        </UserStateProvider>
      </BrowserRouter>
    </>
  </React.StrictMode>,
);
