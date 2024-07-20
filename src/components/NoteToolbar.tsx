import { ButtonEnum, IconEnum } from "@/types/enums";
import IconButton from "./IconButton";
import styled from "styled-components";

type NoteToolbarProps = {
  close: () => void;
  save: () => void;
  options: () => void;
}

function NoteToolbar({close, save, options}: NoteToolbarProps) {
  
  return (
    <Toolbar>
      <Group>
        <IconButton
          type={ButtonEnum.Border}
          icon={IconEnum.Left}
          action={close}
        />
        <IconButton 
          type={ButtonEnum.Border}
          icon={IconEnum.Check}
          action={save}
        />
      </Group>
      <Group>
        <IconButton 
          type={ButtonEnum.Border}
          icon={IconEnum.Options}
          action={options}  
        />
      </Group>
    </Toolbar>
  )
}

export default NoteToolbar;

const Toolbar = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--n-300);
`;
const Group = styled.div`
display: flex;
`;
`
  .back {
    overflow: visible;
    fill:transparent;
    width: 1rem;
    height: 1rem;
    stroke: var(--primary);
    stroke-width: 2;
  }`