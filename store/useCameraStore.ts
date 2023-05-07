import { create } from 'zustand';

interface CameraState {
  isCameraOpen: boolean;
  capturedImage: string | null;
  setIsCameraOpen: (isCameraOpen: boolean) => void;
  setCapturedImage: (imageUri: string | null) => void;
}

export const useCameraStore = create<CameraState>((set) => ({
  isCameraOpen: false,
  capturedImage: null,
  setIsCameraOpen: (isCameraOpen) => set({ isCameraOpen }),
  setCapturedImage: (imageUri) => set({ capturedImage: imageUri }),
}));
