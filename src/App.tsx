import '@/App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from '@/pages/MainPage';
import LoginPage from '@/pages/LoginPage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginState } from './hooks/providerHooks';
import { databaseDispatchers } from './redux/customDispatchers';
import store, { DatabaseDispatch } from './redux/store';
import { DatabaseActions } from './slices/databaseSlice';
import { databaseFunctions } from './utils/databaseFunctions';
import { isFirebase } from './utils/sharedUtils';
import { Page } from './types/enums';

function App() {
  
  const dispatch = useDispatch<DatabaseDispatch>();
  const { user } = useLoginState();
  const database = store.getState().database.database;
  const databaseFn = databaseDispatchers(dispatch) as DatabaseActions;

  useEffect(() => {
    if (isFirebase() && user?.uid || !isFirebase()) {
      const dbf = databaseFunctions(databaseFn, database, user?.uid);
      dbf.fetchDatabase();
      console.log('app watcheffect', Object.values(database).length);
    }
  },)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={Page.MAIN} element={<MainPage />} />
          <Route path={Page.LOGIN} element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
