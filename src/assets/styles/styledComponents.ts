import styled from "styled-components";

export const mobile = '30rem';
export const tablet = '40rem';
export const tabletUp = 'calc(40rem + 1px)';

export const easing = {
  easeInOutQuint: 'cubic-bezier(0.83, 0, 0.17, 1)',
  easeOutQuint: 'cubic-bezier(0.22, 1, 0.36, 1)',
};

export const H1 = styled.h1`
  user-select: none;
  font-size: 1rem;
  font-weight: 400;
`;

export const H2 = styled.h2`
  user-select: none;
  font-size: 0.875rem;
  font-weight: 500;
`;

export const H3 = styled.h3`
  text-transform: uppercase;
  font-size: .75rem;
  font-weight: 700;
`;

export const H4 = styled.h4`
  font-size: var(--list-item-font-size);
  font-weight: 700;
  margin: 0;
`;

export const p = styled.p``;

export const Small = styled.p`
  font-size: .625rem;
  color: var(--n-400);
`

export const BaseInput = styled.input`
  font-size: .875rem;
  font-weight: 500;
  background-color: var(--n-100);
  border: 0.0625rem solid var(--n-300);
  color: var(--n-500);
  border-radius: 0.125rem;
  padding: 0 1rem;
  height: 2.25rem;
  width: 100%;
  box-sizing: border-box;
`;


export const BaseButton = styled.button`
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  box-sizing: border-box;
  background-color: transparent;
  border: none;
  padding: 0;
  border-radius: 0.25rem;
  min-height: 48px;
`;

export const PageWrapper = styled.div`
  box-sizing: border-box;
  display: grid;
  gap: 1rem 0;
  place-content: center;
  width: 100vw;
  height: 100vh;
  padding: 2rem;
  max-width: 20rem;
  margin: auto;
  place-items: center start;
`;

export const queryTabletUp = (styles: string) => `
  @media (min-width: ${tabletUp}) {
    ${styles}
  }
`;