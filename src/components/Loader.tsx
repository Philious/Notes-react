import { useEffect, useState } from "react";
import '@/components/loader.scss';
import { Page } from "@/types/enums";
import store from "@/redux/store";

export const Loader = () => {

  const database = store.getState().database.database;

  const dots = [
    'Loading... ',
    'Loading ...',
    'Loading. ..',
    'Loading.. .',
  ];

  const [message, setMessage] = useState('');
  
  const loadingMessage = (index = 0) => {
    const timeOut = setTimeout(() => {
      setMessage(dots[index]);
      loadingMessage(index >= dots.length - 1 ? 0 : ++index);
    }, 100);

    return timeOut;
  }
  useEffect(() => {
    const timeout = loadingMessage();
    // console.log('load on');
    return () => {
      // console.log('load off', loading);
      clearTimeout(timeout)
    };
  }, []);
  
  return ((Object.values(database).length === 0 && location.pathname !== Page.LOGIN) &&
    <div id="loading-screen">
      <span className="message">{ message }</span>
    </div>
  )
}