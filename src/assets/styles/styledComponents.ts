export const easing = {
  easeInOutQuint: 'cubic-bezier(0.83, 0, 0.17, 1)',
  easeOutQuint: 'cubic-bezier(0.22, 1, 0.36, 1)',
};

export const ButtonBase = `
background-color: transparent;
border: none;
padding: 0;
`;

export const tabletUp = (styles: string) => `
  @media (min-width: 40rem) {
    ${styles}
  }
`;