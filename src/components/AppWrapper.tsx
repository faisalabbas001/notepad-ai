"use client";
import { useState } from "react";

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  // Put your modal state and blur logic here
  // Example:
  // const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      {children}
      {/* Render your modal here if needed */}
    </div>
  );
}
