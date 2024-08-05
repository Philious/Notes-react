import styled from "styled-components";

export const easing = {
  easeInOutQuint: 'cubic-bezier(0.83, 0, 0.17, 1)',
  easeOutQuint: 'cubic-bezier(0.22, 1, 0.36, 1)',
};

export const H1 = styled.h1`
  user-select: none;
  font-size: 1rem;
  font-weight: 500;
`;

export const ButtonBase = `
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

export const tabletUp = (styles: string) => `
  @media (min-width: 40rem) {
    ${styles}
  }
`;