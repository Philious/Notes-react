import { OverlayContextType, OverlayContext } from "@/providers/overLayProvider";
import { useContext } from "react";

export const useOverlay = (): OverlayContextType => {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error('useOvelay must be used within a OverlayProvider');
  }
  return context;
};
