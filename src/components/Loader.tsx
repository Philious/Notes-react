import { useEffect, useState } from "react";
import '@/components/loader.scss';
import styled from "styled-components";

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
    <Wrapper id="loading-screen">
      <Message className="message">{ message }</Message>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  position: fixed;
  inset: 0;
  background: var(--n-200);
  letter-spacing: .125rem;
  z-index: 1;
`

const Message = styled.span`
  width: 4.625rem;
  white-space: nowrap;
`