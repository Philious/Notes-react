import { IconEnum, ButtonEnum } from "@/types/enums";
import Icon from '@/components/icons/Icon';
import styled from "styled-components";
import { BaseButton } from "@/assets/styles/styledComponents";

type IconButtonType = {
  style: ButtonEnum,
  icon: IconEnum,
  action: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  className?: string,
  type?: "submit" | "button" | "reset"
}

function IconButton({ type, style, icon, action, className }: IconButtonType) {
  return (
    <Button
      type={type}
      className={className}
      onClick={action}
    >
      <Background className={`bkg ${style} ${icon}`}>
        <Icon icon={icon}/>
      </Background>
    </Button>
  )
}

export default IconButton;

const Button = styled.button`
  ${BaseButton}
  width: 3rem;
  height: 3rem;
  display: grid;
  place-content: center;
  background-color: transparent;
  border: none;
`;

const Background = styled.div`
  display: grid;
  place-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  &.filled {
    background-color: var(--n-500);
    svg { fill: var(--black); }
  }
  &.border {
    fill: var(--n-500);
    border: 1px solid var(--n-300);
  }
`
