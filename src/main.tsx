import React from 'react';
import ReactDOM from 'react-dom/client';
import Pages from '@/pages/router';
import '@/assets/styles/styles.scss';
import '@/assets/styles/_variables.scss';
import { OverlayProvider } from '@/providers/overLayProvider';
import { UserStateProvider } from './providers/userStateProvider';
import { BrowserRouter } from 'react-router-dom';
import { NotesProvider } from './providers/notesProvider';

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(() => console.log("Service Worker registered!"))
    .catch((err) => console.error("Service Worker registration failed:", err));
}



const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <>
      <BrowserRouter future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  }}>
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
