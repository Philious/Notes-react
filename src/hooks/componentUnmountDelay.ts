import { useCallback, useEffect, useMemo, useState } from "react";
export enum MountState {
  Mounting,
  In,
  Mounted,
  Out,
  UnMounted
}

type AnimateState = (
  state: MountState,
  setState: React.Dispatch<React.SetStateAction<MountState>>,
  show: boolean,
  inDelay: number,
  outDelay?: number,
) => void

export const animationState: AnimateState = (state, setState, show, inDelay, outDelay) => {
  let timeout: NodeJS.Timeout;
  console.log('in', show, MountState[state]);
  if (show && MountState.UnMounted) {
    setState(MountState.Mounting)
    timeout = setTimeout(() => {
      setState(MountState.In);
      clearTimeout(timeout)
    })
  } else if (state === MountState.In) {
    timeout = setTimeout(() => {
      setState(MountState.Mounted)
      clearTimeout(timeout);
    }, inDelay
    );
  } else if (!show && state === MountState.Mounted) {
    setState(MountState.Out)
    timeout = setTimeout(() => {
      setState(MountState.UnMounted);
      clearTimeout(timeout);
    }, outDelay ?? inDelay);
  }
  console.log('out', show, MountState[state]);
}


export const useMountingDelays = (show: boolean, inDelay: number, outDelay: number) => {
  const [state, setState] = useState<MountState>(MountState.UnMounted);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    console.log('in', show, MountState[state]);
    if (show && MountState.UnMounted) {
      setState(MountState.Mounting)
    }
    if (show && MountState.Mounting) {
      timeout = setTimeout(() => {
        setState(MountState.In);
      })
    } else if (state === MountState.In) {
      timeout = setTimeout(
        () => setState(MountState.Mounted),
        inDelay
      );
    } else if (!show && state === MountState.Mounted) {
      setState(MountState.Out)
      timeout = setTimeout(
        () => setState(MountState.UnMounted),
        outDelay
      );
    }

    return () => clearTimeout(timeout);
  }, [show, state]);

  return state;
}