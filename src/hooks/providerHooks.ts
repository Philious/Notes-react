import { notesProvider } from "@/providers/notesProvider";
import { overlayProvider } from "@/providers/overLayProvider";
import { userStateProvider } from "@/providers/userStateProvider";

export const useOverlay = overlayProvider;
export const useUserState = userStateProvider;
export const useNotes = notesProvider;