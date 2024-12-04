// src/store/modalStore.js
import { create } from 'zustand';  // default가 아닌 create로 임포트

const useModalStore = create((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export default useModalStore;