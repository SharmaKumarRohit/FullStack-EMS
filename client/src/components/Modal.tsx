import { createPortal } from "react-dom";

type PropsType = {
  children: React.ReactNode;
  closeModal: () => void;
  maxWidth?: string;
  alignment?: string;
};

function Modal({
  children,
  closeModal,
  maxWidth = "max-w-3xl",
  alignment = "items-start",
}: PropsType) {
  return createPortal(
    <>
      <div
        className={`fixed bg-black/40 backdrop-blur-sm inset-0 z-50 flex ${alignment} justify-center p-4 overflow-y-auto`}
        onClick={closeModal}
      >
        <div
          className={`relative bg-white rounded-2xl shadow-2xl w-full ${maxWidth} my-8 animate-fade-in`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>,
    document.getElementById("modal")!,
  );
}

export default Modal;
