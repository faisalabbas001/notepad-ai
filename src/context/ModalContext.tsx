"use client";
import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext<{
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}>({
  modalOpen: false,
  setModalOpen: () => {},
});

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <ModalContext.Provider value={{ modalOpen, setModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};
