import { useEffect } from "react";

export default function Modal({ children, isOpen, onClose }) {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop and modal container */}
      <div
        className="backdrop-blur-xs fixed inset-0 z-50 flex items-center justify-center bg-black/20"
        onClick={onClose}
      >
        {/* Modal content */}
        <div
          className="relative rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800  min-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  );
}
