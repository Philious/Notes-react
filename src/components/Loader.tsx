import { useEffect, useState } from "react";
import '@/components/loader.scss';

export const Loader = () => {
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
    return () => {
      clearTimeout(timeout)
    };
  }, []);
  
  return (
    <div id="loading-screen">
      <span className="message">{ message }</span>
    </div>
  )
}