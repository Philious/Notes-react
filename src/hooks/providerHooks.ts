import { OverlayContext, OverlayContextType } from "@/providers/overLayProvider";
import { UserStateContext, UserStateContextType } from "@/providers/userStateProvider";
import { useContext } from "react";

export const useOverlay = (): OverlayContextType => {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error('useOvelay must be used within a OverlayProvider');
  }
  return context;
};

export const useUserState = (): UserStateContextType => {
  const context = useContext(UserStateContext);
  if (!context) {
    throw new Error('useOvelay must be used within a UserStateContext');
  }
  return context;
};