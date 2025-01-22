import {create} from 'zustand';

interface FieldValues {
  [key: string]: string;
}

interface ImageData {
  id: string;
  preview: string;
  comparison: string;
  fields: FieldValues;
  timestamp: number;
}

interface ModalStore {
  isOpen: boolean;
  imageHistory: ImageData[];
  currentImage: ImageData | null;
  openModal: () => void;
  closeModal: () => void;
  addImageData: (preview: string, comparison: string, fields: FieldValues) => void;
  clearHistory: () => void;
  setCurrentImage: (imageData: ImageData | null) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  imageHistory: [],
  currentImage: null,

  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),

  addImageData: (preview: string, comparison: string, fields: FieldValues) => 
    set((state) => ({
      imageHistory: [...state.imageHistory, {
        id: crypto.randomUUID(),
        preview,
        comparison,
        fields,
        timestamp: Date.now()
      }]
    })),

  clearHistory: () => set({ imageHistory: [] }),
  setCurrentImage: (imageData) => set({ currentImage: imageData })
}));