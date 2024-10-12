import { createPortal } from "react-dom";

type Props = {
  title: string;
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
};
export default function ModalDialog({
  children,
  title,
  open,
  handleClose,
}: Props) {
  if (!open) return null;

  return createPortal(
    <div className="modal">
      <div className="modal-content">
        <h1 className="title">{title}</h1>
        {children}
        <button onClick={handleClose}>CLOSE</button>
      </div>
    </div>,
    document.body
  );
}
