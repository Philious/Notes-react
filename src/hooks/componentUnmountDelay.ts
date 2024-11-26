import { useEffect, useState } from "react";
export enum MountState {
  Mounting,
  In,
  Mounted,
  Out,
  UnMounted
}
export function useMountingDelays(isMounted: boolean, inDelay: number, outDelay: number) {
  const [shouldRender, setShouldRender] = useState<MountState>(MountState.Mounting);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isMounted && !shouldRender) {
      timeoutId = setTimeout(() => {
        setShouldRender(MountState.In);
      })
    } else if (shouldRender === MountState.In) {
      timeoutId = setTimeout(
        () => setShouldRender(MountState.Mounted),
        inDelay
      );
    } else if (!isMounted && shouldRender) {
      setShouldRender(MountState.Out)
      timeoutId = setTimeout(
        () => setShouldRender(MountState.UnMounted),
        outDelay
      );
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted, shouldRender]);
  return shouldRender;
}