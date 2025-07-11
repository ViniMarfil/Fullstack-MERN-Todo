export default function Modal({ children, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="backdrop-blur-xs fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="relative rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800">
        <button
          className="absolute right-2 top-2 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
          onClick={onClose}
          aria-label="Close modal"
        ></button>
        {children}
      </div>
    </div>
  );
}
