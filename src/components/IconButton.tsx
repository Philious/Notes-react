import { IconEnum, ButtonEnum } from "@/types/enums";
import Icon from '@/components/icons/Icon';
import styled from "styled-components";

type IconButtonType = {
  type: ButtonEnum,
  icon: IconEnum,
  action: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  iconSize?: string;
  buttonSize?: string;
  className?: string
}

function IconButton({ type, icon, action, iconSize = '2rem', buttonSize = '3rem', className }: IconButtonType) {
  return (
    <Button
      className={className}
      onClick={action}
      $size={buttonSize}
    >
      <Background $type={type} $size={iconSize}>
        <Icon icon={icon}/>
      </Background>
    </Button>
  )
}

export default IconButton;

const Button = styled.button<{ $size: string }>`
  width: ${props => props.$size};
  height: ${props => props.$size};
  padding: 0;
  display: grid;
  place-content: center;
  background-color: transparent;
  border: none;
`;

const Background = styled.div<{ $type: string, $size: string }>`
  display: grid;
  place-content: center;
  width: ${props => props.$size};
  height: ${props => props.$size};
  border-radius: 50%;
  ${props => {
    if(props.$type === ButtonEnum.Filled) return (`
        background-color: var(--n-500);
        svg { fill: var(--black); }
      `);
    if(props.$type === ButtonEnum.Border) return (`
      fill: var(--n-500);
      border: 0.0625rem solid var(--n-300);
    `);
  }};
`
