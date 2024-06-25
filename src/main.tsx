import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App.tsx';
import '@/index.css';
import '@/assets/styles/styles.scss';
import { DialogProvider } from '@/services/dialogService.tsx';
import { DataBaseProvider } from './providers/firebasProvider';
import { ContextMenuProvider } from './providers/contextMenuProvider';
const t = (() => {
  const c = new Map();
  c.set('test', { id: 'test',
  title: 'ttitt',
  body: 'boddobboodyyy',
  lastupdated: 0,
  created: 0
  })
  return c
})();
// localStorage.setItem('notesTestData', JSON.stringify([...t.values()]))
const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <>
      <DataBaseProvider>
        <DialogProvider>
          <ContextMenuProvider>
          <App />    
          </ContextMenuProvider>
        </DialogProvider>
      </DataBaseProvider>
    </>
  </React.StrictMode>,
);
