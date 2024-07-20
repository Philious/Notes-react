import { Direction, IconEnum } from "@/types/enums";
import styled from 'styled-components';

interface IconType extends React.HTMLAttributes<SVGAElement> { icon: IconEnum }

const Add = () => (
  <SVG
    viewBox="0 0 24 24"
    className="add icn"
  >
    <path d="M13 7H11V11L7 11V13H11V17H13V13H17V11L13 11V7Z" />
  </SVG>
);

const Arrow = (direction: Direction) => (
  <SVG
    viewBox="0 0 24 24"
    className="arrow icn"
    transform={`rotate(${direction === Direction.UP
      ? 270
      : direction === Direction.LEFT
      ? 180
      : direction === Direction.DOWN
      ? 90 : 0}, 0, 0)`}
  >
    <path d="M14 16L20 12L14 8V11H4V13H14V16Z" />
  </SVG>
)

const Check = () => (
  <CheckSVG
    viewBox="0 0 24 24"
    className="check icn"
    strokeLinecap="round"
  >
    <path d="M17.6066 8L10.5355 15.0711L7 11.5355" />
  </CheckSVG>
) 

const ContextOptions = () => (
  <SVG
    viewBox="0 0 24 24"
    className="context-options icn"
  >
    <path d="M10 12a2 2 0 1 0 4 0a2 2 0 1 0 -4 0M10 5a2 2 0 1 0 4 0a2 2 0 1 0 -4 0M10 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
  </SVG>
)

const LetterSize = () => (
  <SVG
    viewBox="0 0 24 24"
    className="letter-size icn"
    strokeLinecap="round"
  >
    <path d="M5.24987 12H4L6.27564 5H7.7212L10 12H8.75013L7.02367 6.43555H6.97317L5.24987 12ZM5.2909 9.25537H8.69963V10.2739H5.2909V9.25537Z" />
    <path d="M10.9008 17.3822H8.50656L12.8657 5H15.6348L20 17.3822H17.6058L14.2986 7.53932H14.2019L10.9008 17.3822ZM10.9794 12.5273H17.5091V14.329H10.9794V12.5273Z" />
  </SVG>
)

const List = () => (
  <ListSVG viewBox="0 0 16 16" className="list icn">
    <circle
      className="circle"
      cx="2"
      cy="3"
      r="1.5"
    />
    <circle
      className="circle"
      cx="2"
      cy="8"
      r="1.5"
    />
    <circle
      className="circle"
      cx="2"
      cy="13"
      r="1.5"
    />
    <path
      className="path"
      d="M6 3H16M6 8H16M6 13H16"
    />
  </ListSVG>
)

const Logout = () => (
  <SVG
    viewBox="0 0 24 24"
    className="logout icn"
  >
    <path d="M16 16L22 12L16 8V11H6V13H16V16ZM2 4C2 2.89543 2.89543 2 4 2H12C13.1046 2 14 2.89543 14 4V6H12V4L4 4V20H12V18H14V20C14 21.1046 13.1046 22 12 22H4C2.89543 22 2 21.1046 2 20V4Z" />
  </SVG>
)

const Remove = () => (
  <SVG
    viewBox="0 0 24 24"
    className="remove icn"
    strokeLinecap="round"
  >        
    <path
      transform="rotate(45)"
      transform-origin="center"
      d="M13 7H11V11L7 11V13H11V17H13V13H17V11L13 11V7Z"
    />
  </SVG>
)

const Settings = () => (
  <SVG
    viewBox="0 0 16 16"
    className="settings icn"
    strokeLinecap="round"
  >
    <path
      d="m9.3 22-.4-3.2a3.79 3.79 0 0 1-.61-.3 5.5 5.5 0 0 1-.56-.38l-2.98 1.25L2 14.63l2.58-1.94a2.39 2.39 0 0 1-.03-.34v-.68c0-.1 0-.22.03-.34L2 9.38l2.75-4.74 2.97 1.25A6.82 6.82 0 0 1 8.9 5.2L9.3 2h5.5l.4 3.2a5.5 5.5 0 0 1 1.17.68l2.98-1.25 2.75 4.75-2.58 1.94.03.34v.68c0 .1-.02.22-.05.34l2.57 1.95-2.75 4.74-2.95-1.25a6.83 6.83 0 0 1-1.17.68l-.4 3.2H9.3Zm2.8-6.5c.97 0 1.8-.34 2.47-1.03A3.37 3.37 0 0 0 15.6 12c0-.97-.34-1.8-1.03-2.47A3.37 3.37 0 0 0 12.1 8.5c-.98 0-1.81.34-2.49 1.03A3.4 3.4 0 0 0 8.6 12c0 .97.34 1.8 1.01 2.47.68.69 1.5 1.03 2.49 1.03Z"
    />
  </SVG>
)

const Icon: React.FC<IconType> = (props) => {
  const iconStack = {
    [IconEnum.Add]: Add,
    [IconEnum.Down]: () => Arrow(Direction.DOWN),
    [IconEnum.Cancel]: Remove,
    [IconEnum.Remove]: Remove,
    [IconEnum.Left]: () => Arrow(Direction.LEFT),
    [IconEnum.List]: List,
    [IconEnum.Options]: ContextOptions,
    [IconEnum.Right]: () => Arrow(Direction.RIGHT),
    [IconEnum.Setting]: Settings,
    [IconEnum.Up]: () => Arrow(Direction.UP),
    [IconEnum.Check]: Check,
    [IconEnum.LetterSize]: LetterSize,
    [IconEnum.LogOut]: Logout,
  }
  
  return (
    <>
      {  iconStack[props.icon]() }
    </>
  )
}

export default Icon

const SVG = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
  fill: var(--n-500);
`;
const CheckSVG = styled(SVG)`
  stroke: var(--n-500);
  stroke-width: 2px;
  fill: transparent;
`;
const ListSVG = styled(SVG)`
  width: 1rem;
  height: 1rem;
  .path {
    fill: transparent;
    stroke: var(--n-500);
    stroke-width: 1.5;
  }
  .circle  {
    fill:var(--n-500);
  }
`;