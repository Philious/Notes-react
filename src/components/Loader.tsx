import styled from "styled-components";

export const Loader = ({loading}:{loading: boolean}) => {
    return (
     <Wrapper id="loading-screen" $loading={loading}>
      <Message className="message">
        Loading
        <Dott $in={3}>.</Dott>
        <Dott $in={2}>.</Dott>
        <Dott $in={1}>.</Dott>
      </Message>
    </Wrapper> 
  )
}

const Wrapper = styled.div<{$loading: boolean}>`
  display: ${props => props.$loading ? 'grid' : 'none'};
  opacity: ${props => props.$loading ? 1 : 0 };
  place-items: center;
  position: fixed;
  inset: 0;
  background: var(--n-200);
  letter-spacing: .125rem;
  z-index: 1;
  transition: opacity .25s, display .5s allow-discrete;
`
const Dott = styled.span<{ $in: number }>`
  @keyframes out${props => props.$in} {
    0%, ${props => 50 + ((4 - props.$in) * 14)}%  { transform: translateX(0); }
    ${props => props.$in * 14}%, 50% { transform: translateX(1rem); }
  };

  display: inline-block;
  animation: out${props => props.$in} 1s infinite;  
`;
const Message = styled.span`
  width: 4.625rem;
  white-space: nowrap;
`