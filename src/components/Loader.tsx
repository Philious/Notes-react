import { useEffect, useState } from "react";
import '@/components/loader.scss';
import { useDatabase } from "@/utils/helpers";

export const Loader = () => {

  const dots = [
    'Loading... ',
    'Loading ...',
    'Loading. ..',
    'Loading.. .',
  ];

  const { loading } = useDatabase();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const loadingMessage = (index = 0) => {
    const timeOut = setTimeout(() => {
      setMessage(dots[index]);
      loadingMessage(index >= dots.length - 1 ? 0 : ++index);
    }, 100);
    return timeOut;
  }
  
  useEffect(() => setIsLoading(loading), [loading]);
  useEffect(() => {
    const timeout = loadingMessage();

    return () => {
      clearTimeout(timeout)
    };
  }, []);
  
  return (isLoading &&
      <div id="loading-screen">
        <span className="message">{ message }</span>
      </div>
  )
}