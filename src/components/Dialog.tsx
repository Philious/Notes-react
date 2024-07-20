import React, { useEffect, useState } from 'react';
import { DialogProps, DialogActionProps } from '@/types/types';
import { useOverlay } from '@/hooks/providerHooks';
import styled from 'styled-components';
import Button from '@/components/Button';
import { easing } from '@/assets/styles/styledComponents';

const Dialog: React.FC = () => {
  const animationSpeed = 250;
  const { setDialog, dialog } = useOverlay();
  const [dialogRef, setDialogRef] = useState<DialogProps | null>(dialog ?? null);
  const [ active, setActive] = useState(false);
  const [show, setShow ] = useState(false);
  const actionHandler = (action: DialogActionProps) => {
    action.action();
    if (action.closeOnAction !== false) setDialog()
  }

  useEffect(() => {
    if (dialog) {
      setDialogRef(dialog);
      setActive(true)
      setTimeout(() => { 
        setShow(true);
      }, 10);
    } else {
      setShow(false);
      setTimeout(() => {
        setActive(false);
        setDialogRef(null);
      }, animationSpeed);
    }
  }, [dialog, setActive, active, show])

  if (active)
    return (
      <Wrapper onClick={() => setDialog()}>
        <Container $show={show} $speed={animationSpeed}>
          {dialogRef?.title && <Title className="dialog-title">{dialogRef.title}</Title>}
          {dialogRef?.content && <Content className="dialog-content">{dialogRef.content}</Content>}
          <Footer className="dialog-footer">
            {dialogRef?.actions.map((action) => (
              <Button key={action.name} primary={true} label={action.name} action={() => actionHandler(action)} />
            ))}
          </Footer>
        </Container>
      </Wrapper>
    );
};

export default Dialog;

const Wrapper = styled.div`
  position: fixed;
  max-width: 100vw;
  max-height: 100vh;
  inset: 0;
  display: grid;
  place-content: center;
  z-index: 1;
`;

const Container = styled.div<{$speed: number, $show?: boolean}>`
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
  opacity: 0;
  transition-property: opacity, transform;
  transition-duration: ${$props => $props.$speed}ms;
  transform: translateY(3rem);
  transition-timing-function: ${easing.easeOutQuint};
  opacity: ${props => props.$show ? 1 : 0 };
  transform: ${props => props.$show ? 'translateY(0)' : 'translateY(3rem)' };
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