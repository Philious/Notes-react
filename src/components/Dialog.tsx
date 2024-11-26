import React, { useEffect, useRef, useState } from 'react';
import { DialogContextProps, DialogActionProps } from '@/types/types';
import styled from 'styled-components';
import Button from '@/components/Button';
import { easing } from '@/assets/styles/styledComponents';
import { MountState } from '@/hooks/componentUnmountDelay';

type DialogProps = {
  mountState: MountState;
  dialogContextProps: DialogContextProps | null;
  close: () => void;
}

const Dialog = ({ mountState, dialogContextProps, close }: DialogProps) => {
  const animationSpeed = 250;

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [DialogContextPropsRef, setDialogContextPropsRef] = useState<DialogContextProps | null>(dialogContextProps ?? null);
  const [ active, setActive] = useState(false);
  const actionHandler = (action: DialogActionProps) => {
    action.action();
    if (action.closeOnAction !== false) close()
  }

  useEffect(() => {
    if (dialogContextProps) {
      setDialogContextPropsRef(dialogContextProps);
      setActive(true)
      setTimeout(() => { 
        dialogRef.current?.showModal()
      }, 10);
    } else {
      dialogRef.current?.close()
      setTimeout(() => {
        setActive(false);
        setDialogContextPropsRef(null);
      }, animationSpeed);
    }
  }, [dialogContextProps, setActive, active])

  if (active)
    return (
      <Container $speed={animationSpeed} ref={dialogRef}>
        {DialogContextPropsRef?.title && <Title className="dialog-title">{DialogContextPropsRef.title}</Title>}
        {DialogContextPropsRef?.content && <Content className="dialog-content">{DialogContextPropsRef.content}</Content>}
        <Footer className="dialog-footer">
          {DialogContextPropsRef?.actions.map((action) => (
            <Button key={action.name} primary={true} label={action.name} action={() => actionHandler(action)} />
          ))}
        </Footer>
      </Container>
    );
};

export default Dialog;

const Container = styled.dialog<{$speed: number}>`
  display: grid;
  max-height: 90vw;
  grid-template-rows: repeat(3, auto);
  background-color: hsl(0, 0%, 10%);
  border-radius: .5rem;
  box-shadow:
    0 0 2px hsla(0,0%,0%, .48),
    0 2px 6px hsla(0,0%,0%, .24),
    0 6px 18px hsla(0,0%,0%, .12),
    0 18px 54px hsla(0,0%,0%, .06);
  &[open] {
    transform: translateY(0);
    opacity: 1;
  }
  opacity: 0;
  transform: transform(3rem);
  transition-behavior: normal, normal, allow-discrete, allow-discrete;
  transition-property: opacity, transform, overlay, display;
  transition-duration: ${$props => $props.$speed}ms;
  transition-timing-function: linear, ${easing.easeOutQuint}, linear, linaer;

  @starting-style {
    dialog[open] {
      opacity: 0;
      transform: transform(3rem);
    }
  }
}
`;

const Title = styled.div`
  font-size: 1rem;
  line-height: 1;
  padding: 1.5rem 1.5rem .75rem;
`;

const Content = styled.div`
  font-size: .825rem;
  font-weight: 400;
  padding: 1.5rem;
`;

const Footer = styled.div`
  display: flex;
  padding: .75rem 1.5rem 1.5rem;
  gap: .75rem;
  justify-content: flex-end;
`;